/* eslint-disable no-console */
const db = require('../../models');

exports.createDefaultChannels = async (req, res) => {
  try {
    const result = await db.Channel.bulkCreate(req.body);

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

exports.assignUserToChannels = async (req, res) => {
  try {
    const { id } = req.params;
    const channels = req.body;

    const channelIds = channels.map((channel) => +channel.id);
    const user = await db.User.findByPk(id);
    const result = await user.setChannels(channelIds);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500);
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
    res.status(500);
  }
};

exports.getChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await db.Channel.findByPk(id, {
      include: [{ model: db.Post, as: 'posts' }],
    });
    res.status(200).send(channel);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
