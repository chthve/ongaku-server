/* eslint-disable no-console */
const db = require('../../models');

exports.postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, body } = req.body;
    const post = await db.Post.findByPk(id);
    const comment = await db.Comment.create({
      userId,
      body,
    });
    await post.addComments(comment);
    res.status(201).send(comment);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { userId } = req.body;
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
