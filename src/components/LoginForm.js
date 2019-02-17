import React, { Component, Fragment } from 'react'
import { TextField, Paper, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10%'
  },
  dence: {
    padding: 15,
  }
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
      this.setError('This name is taken');
    } else {
      this.props.setUser(user);
      this.setError('');
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
        <Grid className={classes.root} container >
          <Grid item sm={12} xs={12} md={6} style={{textAlign: "center"}}>
            <Paper className={classes.dence}>
              <Typography variant='h4' gutterBottom>
                Hello, new user!
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  label="Your Name"
                  value={name}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <Typography style={{color: "red"}}>{error ? error : null}</Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(LoginForm);