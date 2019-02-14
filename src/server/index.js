const app = require('http');
const io = module.exports.io = require('socket.io');
const socketManager = require('./socketManeger');

const port = process.env.POST || 3000;

io.on('connection', socketManager);

app.createServer(port, () => {
  console.log('server is run on port ', port);
});
