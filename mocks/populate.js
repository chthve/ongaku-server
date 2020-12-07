/* eslint-disable no-console */
const db = require('../models');
const { defaultChannels } = require('./mock');

(async () => {
  try {
    await db.Channel.bulkCreate(defaultChannels);
    console.log('Data populated!!');
  } catch (error) {
    console.error('OOOPS, DATA WAS NOT POPULATED', error);
  }
})();
