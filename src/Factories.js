const uuidv4 = require('uuid/v4');

const createUser = ({name = '', socketId = null}) => (
  {
    id: uuidv4(),
    name,
    socketId
  }
);

const createMessage = ({message = '', sender = '', reciever=''} = {}) => (
  {
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender,
    reciever
  }
);

const createChat = ({users = [], name = 'Community', messages = []} = {}) => (
  {
    id: uuidv4(),
    users,
    messages,
    name,
    typingUsers: []
  }
)

const getTime = (date) => {
  return `${date.getHours()}:${'0'+date.getMinutes().slice(-2)}`
}

module.exports = {
  createUser,
  createChat,
  createMessage
}