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
    });

    // await post.setTags(tags);

    res.status(201).send(post);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
