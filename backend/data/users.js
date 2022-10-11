const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    active: true,
    photo: 'user-1.jpg',
    password: 'test1234',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    active: true,
    photo: 'user-2.jpg',
    password: 'test1234',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    active: true,
    photo: 'user-3.jpg',
    password: '123456',
  },
];

module.exports = users;
