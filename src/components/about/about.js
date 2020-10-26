import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Header from '../header/header';
import './about.scss';
import * as sam from '../../../package.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    minWidth: 200,
    maxWidth: 500,
    width: '100%',
    marginTop: '50px'
  },
  space: {
    marginTop: '30px'
  }
}));

const About = () => {
  document.title = 'S.A.M. | About'
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header title="About" />
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6}>
              <Grid container item className="center">
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Paper className={classes.paper}>
                  <Typography variant="h5" color="inherit" className="text-center">
                    S.A.M
                    <br />
                    Version {sam.version}
                  </Typography>
                  <p className={classes.space}/>
                  <Typography variant="h6" color="inherit" className="text-body">
                    S.A.M stands for Such an Amazing Machine.
                    It is designed to simplify your lifestyle and workflow on any and every activity performed on a Computer.
                    He can illustrate ideas and steps using timelines
                  </Typography>
                  <Typography variant="h6" color="inherit" className="text-body">
                    All you need to do is to train S.A.M and he would help out whenever he can.
                    If you are looking for a way to integrate him into your own application, check out our docs.
                  </Typography>
                  <Typography variant="h6" color="inherit" className="text-body">
                    S.A.M is developed and maintained by Samson Udo.
                  </Typography>
                </Paper>
                </Slide>
              </Grid>
            </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    </div>
  )
}

export default About;
