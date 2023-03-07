const { User } = require('../database/models');

const findAll = async () => {
    const users = await User.findAll();

    return { message: users, status: 200 };
};
const getAllByRole = async (role) => {
    const users = await User.findAll({ where: { role } });

    return { type: null, message: users, status: 200 };
};

module.exports = {
    getAllByRole,
    findAll,
};