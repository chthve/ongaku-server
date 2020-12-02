/* eslint-disable no-console */
const db = require('../../models');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Post, as: 'posts' },
        { model: db.Channel, as: 'channels' },
        { model: db.Comment, as: 'comments' },
      ],
    });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await db.User.create({
      username,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.savePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    const user = await db.User.findByPk(id);
    const post = await db.Post.findByPk(postId);
    const result = await user.addSaved(post);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.unSavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    const post = await db.Post.findByPk(postId);
    const result = await post.destroy({
      include: [{ model: db.User, where: { id } }],
    });

    res.status(204).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getSavedPosts = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.User.findByPk(id);
    const result = await user.getSaved();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
