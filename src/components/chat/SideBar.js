import React, { Component } from 'react';
import { Drawer, Hidden, Avatar, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const styles = theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  search: {
    paddingLeft: 15
  },
  userpanel: {
    position: 'fixed',
    bottom: theme.spacing.unit
  }
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  
  handleChange = ({target: {value}}) => {
    this.setState({
      search: value
    })
  }

  render() {
    const { 
      user,
      activeChat,
      setActiveChat,
      chats,
      logout,
      mobileOpen,
      classes,
      handleDrawerToggle } = this.props;

    const drawer = (
      <div>
        <form onSubmit={this.handleSubmit} className={classes.search}>
          <TextField
            label="Search"
            onChange={this.handleChange}
            margin="normal"
          />
        </form>
        <List 
          className='users'
          ref='users'
          onClick={(e) => {(e.target === this.refs.users) && (setActiveChat(null))}}
        >
          {chats.map((chat) => {
            if(chat.name) {
              const chatteeName = chat.users.find((name) => {
                return name !== user.name
              }) || 'Community';
              const lastMessage = chat.messages[chat.messages.length - 1];
              const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';
              return (
                <ListItem
                  key={chat.id}
                  className = {`${classNames}`}
                  onClick = { () => { setActiveChat(chat) } }
                >
                  <Avatar>
                    {chatteeName[0].toUpperCase()}
                  </Avatar>
                  <ListItemText primary={chatteeName} secondary={lastMessage} />
                </ListItem>
              );
            }
            return null;
          }
          )}
        </List>
        <Divider />
        <List className={classes.userpanel}>
          <ListItem >
            <ListItemText primary={`${user.name}`}></ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={logout}>
                <ExitIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SideBar);