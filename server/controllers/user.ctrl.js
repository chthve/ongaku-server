const db = require('../../models');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id, {
      include: [db.Post],
    });
    res.status(200).send(user);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await db.User.create({
      username,
    });
    res.status(201).send(user);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};

exports.savePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const user = await db.User.findByPk(userId);
    const post = await db.Post.findByPk(postId);
    const result = await user.addSaved(post);
    res.status(201).send(result);
  } catch (error) {
    console.error(error); //eslint-disable-line
    res.status(500);
  }
};

exports.getSavedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('check', id);
    console.log('are u here');
    const user = await db.User.findByPk(id);
    const result = await user.getSaved();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
