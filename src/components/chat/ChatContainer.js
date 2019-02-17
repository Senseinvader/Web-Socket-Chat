import React, { Component, Fragment } from 'react';
import SideBar from './SideBar';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
});


class ChatContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeUser: null,
      mobileOpen: false
    }
  }

  setActiveChat = (chat) => {
    this.setState({activeChat: chat});
  }

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  }

  render() {
    const { user, logout, classes } = this.props;
    const { chats, activeChat, mobileOpen } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Responsive drawer of the chat
            </Typography>
          </Toolbar>
        </AppBar>
        <SideBar 
          user={user}
          logout={logout}
          chats={chats}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ChatContainer);