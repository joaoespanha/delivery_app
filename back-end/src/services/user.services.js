const { User } = require('../database/models');

const findAll = async () => {
    const users = await User.findAll();

    return { message: users, status: 200 };
};

module.exports = {
    findAll,
};