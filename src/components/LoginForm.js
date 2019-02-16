import React, { Component, Fragment } from 'react'
import { TextField, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VERIFY_USER from '../Events';


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
    console.log(this.props)
    this.setState({
      name: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    console.log('handle submit' + socket.id)
    const { name } = this.state;
    socket.emit(VERIFY_USER, name, this.userLogin)
  }

  userLogin = ({user, isUser}) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError('This name is taken');
    } else {
      this.props.userLogin(user);
    }
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