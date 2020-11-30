const db = require('../../models');
const channel = require('../../models/channel');

// exports.getChannels = async (req, res) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     res.status(500);
//   }
// };

exports.createChannels = async (req, res) => {
  try {
    const result = await db.Channel.bulkCreate(req.body);

    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

exports.createUserChannels = async (req, res) => {
  try {
    const { id } = req.params;
    const channels = req.body;
    const user = await db.User.findByPk(id);
    const dbChannels = await db.Channel.findAll();

    console.log(dbChannels);

    // const result = await db.Channel.findAll({
    //   where: {
    //     name:
    //   }
    // });
    // const saved = await db.user.
  } catch (error) {}
};
