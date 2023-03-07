const { User } = require('../database/models');
const { findUser } = require('./register.service')

const findAll = async () => {
    const users = await User.findAll();

    return { message: users, status: 200 };
};
const getAllByRole = async (role) => {
    const users = await User.findAll({ where: { role } });

    return { type: null, message: users, status: 200 };
};
const deleteUser = async (id) => {
    const userToBeDeleted = await User.findOne({ where: { id } })

    if(!userToBeDeleted) return { message: 'Unexistent', status: 404 };

    await userToBeDeleted.destroy();

    return { message: 'user deleted succecefully', status: 200 };
};
module.exports = {
    getAllByRole,
    findAll,
    deleteUser,
};