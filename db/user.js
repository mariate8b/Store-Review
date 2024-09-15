//db / user.js
const prisma = require('../api/index')

const creareUser = (userData) => {
    return prisma.users.create({
        data: userData,
    });

};
const getUserByUsername = (username) =>{
    return prisma.users.findUnique({
        where: {username}
    })
}

module.exports = {createUser, getUserByUsername};