import React, { Component } from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import ChatContainer from './chat/ChatContainer'

const socketUrl = "http://localhost:3001";
const socketIo = io(socketUrl);
export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: socketIo,
      user: null
    }
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    socketIo.on('connect', () => {
      console.log('Connected to' + this.state.socket.id);
    });
  }

  setUser = (user) => {
    const {socket} = this.state;
    socket.emit('USER_CONNECTED', user);
    this.setState({user});
  }

  userLogout = () => {
    const {socket} = this.state;
    socket.emit('LOGOUT');
    this.setState({user: null});
  }

  render() {
    const { socket, user } = this.state;
    return (
      <div>
        {
          !user
          ? <LoginForm socket={socket} setUser={this.setUser}/>
          : <ChatContainer socket={socket} user={user} logout={this.userLogout}/>
        }
      </div>
    )
  }
}
