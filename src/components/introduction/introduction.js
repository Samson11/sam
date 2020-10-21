import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card, CardActions, CardContent, Button, CardHeader, Avatar, CardMedia } from '@material-ui/core';
import gif from '../../assets/samson.gif';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import './introduction.scss';

const useStyle = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 500,
    width: '100%'
  },
  pos: {
    marginBottom: 12
  },
  avatar: {
    backgroundColor: 'black'
  },
  media: {
    height: '230px',
    width: '100%'
  },
 input: {
   marginLeft: 12,
   flex: 1,
 },
 whole: {
   height: '100vh',
   width: '100%'
 }
})

const Introduction = () => {
  const classes = useStyle()
  const avatar = <Avatar aria-label="avatar" className={classes.avatar}>{window.process.env.username[0]}</Avatar>
  const icon = <IconButton><MoreVertIcon /></IconButton>

  return (
    <Paper className={classes.whole}>
      <Fade in={true}>
      <Grid container direction="column">
          <Grid item container>
            <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6}>

              <br />
              <Grid container item className="center">
              <Paper className={classes.root}>
                <Card className={classes.root}>
                  <CardHeader avatar={avatar} title={window.process.env.username} subheader="Installation" action={icon}/>
                  <CardMedia className={classes.media} title="" image={gif} />

                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Lets setup S.A.M. on your computer
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Don't worry it's not gonna take long to get it up and running on your machine.
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button size="large" component={Link} to="/install">Proceed</Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>

              <br />
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
      </Grid>
      </Fade>
    </Paper>
  )
}

export default Introduction;
