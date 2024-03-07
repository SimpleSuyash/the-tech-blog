const {User} = require("../models");

const userData = [
    {
        id:1,
        username: "simplesuyash",
        email: "mrsuyash@y7mail.com",
        password: "@Suyash123"
    },
    {
        id:2,
        username: "mahaan",
        email: "mrmahaan@gmail.com",
        password: "@Mahaan123"
    },
    {
        id:3,
        username: "nivaan123",
        email: "nivaan123@yahoo.com.au",
        password: "@Nivaan123"
    },
    {
        id:4,
        username: "sajana",
        email: "ms.sajana@mail.com",
        password: "@Sajana123"
    }
];
const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
module.exports = seedUsers;