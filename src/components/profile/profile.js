import React, { Component } from 'react';
import Header from '../header/header';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { getData, addData, addTable, verifyValidation, updateRow } from '../../database';
import './profile.scss';

class Profile extends Component {
  state = {
      ifImage: false,
      imgSrc: '',
      imgId: ''
  }

  componentDidMount() {
    getData('profile')
    .then(data => this.setState({ ifImage: true, imgSrc: data[0].profilePicture, imgId: data[0].id}))
    .catch(err => console.log(err))
  }

  render() {
    const add = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) =>  {
        const obj = { profilePicture: e.target.result }
        window.localStorage.setItem('profile', e.target.result)
        verifyValidation('profile')
        .then((res) => {
          updateRow('profile', { id: this.state.imgId },obj).then(() => this.setState({ ifImage: true, imgSrc: e.target.result }))
        })
        .catch(err => addTable('profile').then(() =>
          addData('profile', obj).then(() => this.setState({ ifImage: true, imgSrc: e.target.result }))))
      }
    }

    return(
      <div>
        <Header title="Profile" />
        <Grid container direction="column">
          <Grid item container>
            <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6}>
              <Paper className="card">
                <center>
                  {!this.state.ifImage ? <Avatar alt={window.process.env.username} className="large" style={{height: '130px', width: '130px'}}>{window.process.env.username[0]}</Avatar> : <Avatar alt={window.process.env.username} src={this.state.imgSrc} className="large" style={{height: '130px', width: '130px'}} />}
                </center>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Typography variant="h4" component="div">
                  {window.process.env.username}
                </Typography>
                </Slide>
                <input
                  accept="image/*"
                  className="input"
                  id="contained-button-file"
                  onChange={add}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
                </label>
              </Paper>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Profile;
