/* eslint-disable no-console */
const db = require('../../models');

exports.createDefaultChannels = async (req, res) => {
  try {
    const result = await db.Channel.bulkCreate(req.body);

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.createPrivateChannels = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    console.log(name);
    const channel = await db.Channel.create({
      ownerId: userId,
      name,
      private: true,
    });
    res.status(201).send(channel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.assignUserToChannels = async (req, res) => {
  try {
    const { id } = req.params;
    const channels = req.body;

    const channelIds = channels.map((channel) => channel.id);
    const user = await db.User.findByPk(id);
    const result = await user.setChannels(channelIds);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.createSubChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isPrivate } = req.body;
    const channel = await db.Channel.create({
      parentId: id,
      name,
      private: !!isPrivate,
    });
    res.status(201).send(channel);
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
      },
    });
    res.status(200).send(channels);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await db.Channel.findByPk(id, {
      include: [
        { model: db.Post, as: 'posts' },
        { model: db.Channel, as: 'subChannel' },
      ],
    });
    res.status(200).send(channel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
