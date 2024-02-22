const {User} = require("../models");

const userData = [
    {
        username: "simplesuyash",
        email: "mrsuyash@y7mail.com",
        password: "@Suyash123"
    },
    {
        username: "mahaan",
        email: "mrmahaan@gmail.com",
        password: "@Mahaan123"
    },
    {
        username: "nivaan123",
        email: "nivaan123@yahoo.com.au",
        password: "@Nivaan123"
    },
    {
        username: "sajana",
        email: "ms.sajana@mail.com",
        password: "@Sajana123"
    }
];
const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;