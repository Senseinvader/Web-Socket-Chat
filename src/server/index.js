const app = require('http').createServer();
// const io = module.exports.io = require('socket.io')(app);
const socketIo = require('socket.io');
const socketManager = require('./socketManager');

const port = process.env.POST || 3001;

const server = app.listen(port, () => {
  console.log('server is run on port ', port);
});

const io = socketIo(server, { wsEngine: 'ws' });
io.on('connection', socketManager);