/* eslint-disable no-console */
const db = require('../../models');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.getUser = asyncHandler(async (req, res, next) => {
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
});

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

exports.savePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { postId } = req.body;

  const user = await db.User.findByPk(id);
  if (!user) {
    next(ApiError.notFound('No user found with that id'));
    return;
  }

  const post = await db.Post.findByPk(postId);
  if (!post) {
    next(ApiError.notFound('Post does not exist'));
    return;
  }

  const posts = await user.getSaved();
  const target = posts.find((p) => p.id === postId);

  if (target) {
    next(ApiError.conflict("Post is already saved to 'For Later' list"));
    return;
  }

  const result = await user.addSaved(post);

  res.status(201).send(result);
});

exports.removeSavedPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { postId } = req.body;

  const user = await db.User.findByPk(id);
  if (!user) {
    next(ApiError.notFound('No user found with that id'));
    return;
  }

  const posts = await user.getSaved();
  const target = posts.find((post) => post.id === postId);

  if (!target) {
    next(ApiError.notFound("Post is not in your 'For Later' list"));
    return;
  }

  await user.removeSaved(target);

  res.sendStatus(204);
});

exports.getSavedPosts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await db.User.findByPk(id);

  if (!user) {
    next(ApiError.notFound('No user found with that id'));
    return;
  }

  const result = await user.getSaved();

  res.status(200).send(result);
});
