import React, { Component, Fragment } from 'react';
import { Drawer, Hidden, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Typography, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 480;

const styles = theme => ({
  root: {
    display: 'flex',
  },
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
      activeUser,
      setActiveUser,
      chats,
      logout,
      mobileOpen,
      classes,
      handleDrawerToggle } = this.props;

    const drawer = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Search"
            onChange={this.handleChange}
            margin="normal"
          />
        </form>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem>
            <ListItemText primary={`${user.name}`} ></ListItemText>
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