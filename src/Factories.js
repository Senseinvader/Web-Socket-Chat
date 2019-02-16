const uuidv4 = require('uuid/v4');

const createUser = ({name = ''}) => (
  {
    id: uuidv4(),
    name
  }
);

const createMessage = ({message = '', sender = ''} = {}) => (
  {
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
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