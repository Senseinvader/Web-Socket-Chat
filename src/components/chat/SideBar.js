import React, { Component, Fragment } from 'react';
import { Drawer, Hidden, List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 480;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
});

class SideBar extends Component {
  
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
        <List>

        </List>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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

export default withStyles(styles)(SideBar);