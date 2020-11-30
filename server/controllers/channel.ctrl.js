/* eslint-disable no-console */
const db = require('../../models');

exports.createChannels = async (req, res) => {
  try {
    const result = await db.Channel.bulkCreate(req.body);

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

exports.createUserChannels = async (req, res) => {
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
