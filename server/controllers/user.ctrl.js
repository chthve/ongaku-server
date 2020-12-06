/* eslint-disable no-console */
const db = require('../../models');
const ApiError = require('../utils/apiError');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Post, as: 'posts' },
        { model: db.Channel, as: 'channels' },
      ],
    });

    if (!user) {
      next(ApiError.notFound('No user found with that id'));
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { id, username, resourceUrl, token, tokenSecret } = req.body;

    const user = await db.User.create({
      id,
      username,
      resourceUrl,
      token,
      tokenSecret,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.User.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

exports.savePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    const user = await db.User.findByPk(id);

    if (!user) {
      next(ApiError.notFound('No user found with that id'));
      return;
    }

    const post = await db.Post.findByPk(postId);

    if (!post) {
      next(ApiError.notFound('post does not exist'));
      return;
    }

    const result = await user.addSaved(post);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.removeSavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { postId } = req.body;

    const user = await db.User.findByPk(id);
    const post = await db.Post.findByPk(postId);
    await user.removeSaved(post);

    res.sendStatus(204);
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
