import React, { Component } from 'react';
import io from 'socket.io-client';
import USER_CONNECTED from '../Events';

const socketUrl = "http://localhost:3001";
export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: null
    }
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    });
    this.setState = ({ socket });
  }

  userLogin = (user) => {
    const {socket} = this.state;
    socket.emit(USER_CONNECTED);
    this.setState({user: user});
  }

  userLogout = () => {
    this.setState({user: null})
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        { title }
      </div>
    )
  }
}
