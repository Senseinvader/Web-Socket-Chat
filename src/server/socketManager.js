const io = require('./index').io;
const {createUser, createMessage, createChat} = require('../Factories');

const connectedUsers = {};

module.exports = function(socket) {
  console.log('socket id ' + socket.id);

  socket.on('VERIFY_USER', (username, cb) => {
    console.log('And then vwrify user')
    if (isUser(connectedUsers, username)) {
      cb({isUser: true, user: null})
    } else {
      cb({isUser: false, user: createUser({name:username})})
    }
  })
}

function isUser(connectedUsers, username) {
  return username in connectedUsers
}

function addUser(connectedUsers, user) {
  let newList = Object.assign({}, connectedUsers);
  newList[user.name] = user;
  return newList;
}

function removeUser(connectedUsers, username) {
  let newList = Object.assign({}, connectedUsers);
  delete connectedUsers[username];
  return newList;
}