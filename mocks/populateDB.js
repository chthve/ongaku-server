/* eslint-disable no-console */
const db = require('../models');
const { users, tags, channels } = require('./mock');

(async () => {
  try {
    await db.User.bulkCreate(users);
    await db.Channel.bulkCreate(channels);
    await db.Tag.bulkCreate(tags);

    console.log('Data populated!!');
  } catch (error) {
    console.error('OOOPS, DATA WAS NOT POPULATED', error);
  }
})();
