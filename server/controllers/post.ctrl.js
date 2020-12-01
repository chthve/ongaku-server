const db = require('../../models');

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(post);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, title, artist, thumbnail, year, body } = req.body;
    const { channelId } = req.params;

    const post = await db.Post.create({
      userId,
      channelId,
      title,
      artist,
      year,
      body,
      thumbnail,
    });

    res.status(201).send(post);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};
