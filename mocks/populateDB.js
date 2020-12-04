/* eslint-disable no-console */
const db = require('../models');
const {
  users,
  tags,
  defaultChannels,
  privateChannels,
  posts,
  comments,
} = require('./mock');

(async () => {
  try {
    await db.User.bulkCreate(users);
    await db.Channel.bulkCreate(defaultChannels);
    await db.Tag.bulkCreate(tags);

    const user1 = await db.User.findOne({
      where: {
        username: 'Baiju',
      },
    });

    const user2 = await db.User.findOne({
      where: {
        username: 'Gui',
      },
    });

    const user3 = await db.User.findOne({
      where: {
        username: 'George',
      },
    });

    const createPrivateChannel = async (userId, channelName) => {
      const newChannel = await db.Channel.create({
        ownerId: userId,
        name: channelName,
        private: true,
      });

      return newChannel;
    };

    const subscribeUserToChannel = async (userId, channelId) => {
      try {
        const user = await db.User.findByPk(userId);
        await user.setChannels(channelId);
      } catch (error) {
        console.error(error);
      }
    };

    const createPost = async (userId, channelId, post) => {
      const {
        postTitle,
        title,
        artist,
        year,
        label,
        body,
        thumbnail,
        url,
      } = post;

      const newPost = await db.Post.create({
        postTitle,
        userId,
        channelId,
        title,
        label,
        artist,
        body,
        year,
        thumbnail,
        url,
      });

      return newPost;
    };

    const addComment = async (userId, postId, body) => {
      await db.Comment.create({
        postId,
        userId,
        body,
      });
    };

    await createPrivateChannel(user1.dataValues.id, privateChannels[0].name);
    const channel2 = await createPrivateChannel(
      user2.dataValues.id,
      privateChannels[1].name
    );

    await subscribeUserToChannel(user1.dataValues.id, channel2.dataValues.id);
    await subscribeUserToChannel(user3.dataValues.id, channel2.dataValues.id);

    const post1 = await createPost(
      user1.dataValues.id,
      channel2.dataValues.id,
      posts[1]
    );
    const post2 = await createPost(
      user3.dataValues.id,
      channel2.dataValues.id,
      posts[0]
    );
    await addComment(
      user3.dataValues.id,
      post1.dataValues.id,
      comments[0].body
    );
    await addComment(
      user2.dataValues.id,
      post2.dataValues.id,
      comments[1].body
    );

    console.log('Data populated!!');
  } catch (error) {
    console.error('OOOPS, DATA WAS NOT POPULATED', error);
  }
})();
