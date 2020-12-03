/* eslint-disable no-console */
const db = require('../../models');

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findByPk(id, {
      include: [
        { model: db.Comment, as: 'comments' },
        { model: db.Tag, as: 'tags' },
      ],
    });
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.createPost = async (req, res) => {
  try {
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

    const post = await db.Post.create({
      userId,
      channelId,
      postTitle,
      title,
      artist,
      year,
      label,
      body,
      thumbnail,
      url,
    });

    // await post.setTags(tags);

    res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await db.Post.destroy({
      where: { id, userId },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, postTitle, body } = req.body;
    res.status(201).send('hello');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
