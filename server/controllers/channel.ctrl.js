/* eslint-disable no-console */
const db = require('../../models');
const ApiError = require('../utils/apiError');

exports.createDefaultChannels = async (req, res) => {
  try {
    const result = await db.Channel.bulkCreate(req.body);

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.createChannel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, isPrivate, parentId } = req.body;

    const user = await db.User.findByPk(userId);

    if (!user) {
      next(ApiError.badRequest('No user found with that id'));
      return;
    }

    if (!isPrivate) {
      const queryChannel = await db.Channel.findOne({
        where: {
          name,
        },
      });

      if (queryChannel) {
        next(ApiError.conflict('Channel already exists!'));
        return;
      }
    }

    const channel = await db.Channel.create({
      ownerId: userId,
      parentId: parentId || null,
      name,
      private: !!isPrivate,
    });

    await user.addChannels(channel);
    console.log(channel);

    res.status(201).send(channel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.subscribeToChannels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channels = req.body;

    const channelIds = channels.map((channel) => channel.id);
    const user = await db.User.findByPk(id);

    if (!user) {
      next(ApiError.badRequest('No user found with that id'));
      return;
    }

    const alreadySubscribed = await user.getChannels();

    const checkIfAlreadySubscribed = (existingChannels, newChannel) => {
      return existingChannels.some((channel) => channel.id === newChannel[0]);
    };

    if (checkIfAlreadySubscribed(alreadySubscribed, channelIds)) {
      next(ApiError.conflict('You already subcribed to that channel'));
      return;
    }

    await user.addChannels(channelIds);

    const newlySubscribedChannels = await db.Channel.findAll({
      where: {
        id: channelIds,
      },
    });
    res.status(201).send(newlySubscribedChannels);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.unsubscribeFromChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channel = req.body;

    const user = await db.User.findByPk(id);

    if (!user) {
      next(ApiError.badRequest('No user found with that id'));
      return;
    }

    const alreadySubscribed = await user.getChannels();

    const checkIfAlreadySubscribed = (existingChannels, newChannel) => {
      return existingChannels.some((ch) => ch.id === newChannel.id);
    };

    if (!checkIfAlreadySubscribed(alreadySubscribed, channel)) {
      next(ApiError.badRequest('You are not subscribed to this channel'));
      return;
    }

    await user.removeChannels(channel.id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getAllChannels = async (req, res) => {
  try {
    const channels = await db.Channel.findAll({});
    res.status(200).send(channels);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getDefaultChannels = async (req, res) => {
  try {
    const channels = await db.Channel.findAll({
      where: {
        parentId: null,
        ownerId: null,
      },
    });
    res.status(200).send(channels);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channel = await db.Channel.findByPk(id, {
      include: [
        { model: db.Post, as: 'posts' },
        { model: db.Channel, as: 'subChannel' },
      ],
    });

    // need to handle error when id is shorter
    if (!channel) {
      next(ApiError.badRequest('Channel does not exist'));
      return;
    }

    const users = await channel.getUsers();

    res.status(200).send({ users: users.length, channel });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getPublicChannels = async (req, res) => {
  try {
    const { name } = req.query;

    const filter = {
      private: false,
    };

    if (name) {
      filter.name = name;
    }

    const channels = await db.Channel.findAll({
      where: filter,
    });

    res.status(200).send(channels);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deletePrivateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.body;

    await db.Channel.destroy({
      where: {
        id,
        ownerId,
        private: true,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteAllChannelsFromUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await db.Channel.destroy({
      where: {
        ownerId: userId,
        private: true,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
