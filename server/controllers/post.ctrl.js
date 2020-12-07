const db = require('../../models');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await db.Post.findByPk(id, {
    include: [
      { model: db.Comment, as: 'comments' },
      { model: db.Tag, as: 'tags' },
    ],
  });

  if (!post) {
    next(ApiError.badRequest('Post does not exist'));
    return;
  }

  res.status(200).send(post);
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const {
    userId,
    postTitle,
    title,
    artist,
    thumbnail,
    year,
    body,
    label,
    url,
  } = req.body;
  const { channelId } = req.params;

  const channel = await db.Channel.findByPk(channelId);
  if (!channel) {
    next(ApiError.badRequest('Channel does not exist'));
    return;
  }

  const post = await db.Post.create({
    userId,
    postTitle,
    title,
    artist,
    year,
    label,
    body,
    thumbnail,
    url,
  });

  await channel.addPosts(post);

  res.status(201).send(post);
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const deletedPost = await db.Post.destroy({
    where: { id, userId },
  });

  if (!deletedPost) {
    next(ApiError.badRequest('Post was not deleted because it does not exist'));
    return;
  }

  res.sendStatus(204);
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId, postTitle, body } = req.body;

  const updatedPost = await db.Post.update(
    { postTitle, body },
    { where: { id, userId } }
  );

  if (!updatedPost[0]) {
    next(ApiError.badRequest('Post was not updated because it does not exist'));
    return;
  }

  res.sendStatus(204);
});
