import React, { Component, Fragment } from 'react'
import { TextField, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
});

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: ''
    }
  }

  handleChange = ({target: {value}}) => {
    console.log(this.props, this.props.socket.id)
    this.setState({
      name: value
    })
  }

  setUser = ({isUser, user}) => {
    console.log(user, isUser);
    if (isUser) {
      console.log('this name is taken')
      this.setError('This name is taken');
    } else {
      console.log('This name is free')
      this.props.setUser(user);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { name } = this.state;
    socket.emit('VERIFY_USER', name, this.setUser);
    console.log('after emit')
  }


  setError = (error) => {
    this.setState({error})
  }

  render() {
    const { name, error } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid className={classes.root} container>
          <Grid item xs={6}>
            <Paper >
              <form onSubmit={this.handleSubmit}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <div>{error ? error : null}</div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(LoginForm);