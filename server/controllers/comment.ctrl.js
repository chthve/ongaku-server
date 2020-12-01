const db = require('../../models');

exports.postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, body } = req.body;
    const comment = await db.Comment.create({
      postId: id,
      userId,
      body,
    });
    res.status(201).send(comment);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};
