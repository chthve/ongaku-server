const db = require('../../models');
const asyncHandler = require('../utils/asyncHandler');

exports.createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const tag = await db.Tag.create({
    name,
  });

  res.status(201).send(tag);
});

exports.getTags = asyncHandler(async (req, res) => {
  const tag = await db.Tag.findAll();

  res.status(201).send(tag);
});
