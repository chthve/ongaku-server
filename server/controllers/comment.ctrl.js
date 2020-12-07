/* eslint-disable no-console */
const db = require('../../models');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.postComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId, body } = req.body;

  const user = await db.User.findByPk(userId);
  if (!user) {
    next(ApiError.badRequest('No user found with that id'));
    return;
  }

  const post = await db.Post.findByPk(id);
  if (!post) {
    next(ApiError.badRequest('Post does not exist'));
    return;
  }

  const comment = await db.Comment.create({
    userId,
    body,
  });
  await post.addComments(comment);

  res.status(201).send(comment);
});

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentId } = req.body;
    await db.Comment.destroy({
      where: {
        id: commentId,
        postId: id,
        userId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
