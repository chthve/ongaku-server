/* eslint-disable no-console */
const db = require('../../models');

exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const tag = await db.Tag.create({
      name,
    });

    res.status(201).send(tag);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

exports.getTags = async (req, res) => {
  try {
    const tag = await db.Tag.findAll();

    res.status(201).send(tag);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
