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

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { id, commentId } = req.params;
  const { userId } = req.body;

  const deletedComment = await db.Comment.destroy({
    where: {
      id: commentId,
      postId: id,
      userId,
    },
  });

  if (!deletedComment) {
    next(ApiError.badRequest('Can not delete comment that does not exist'));
    return;
  }

  res.sendStatus(204);
});
