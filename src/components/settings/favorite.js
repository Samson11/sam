import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyle = makeStyles({
  paper: {
    marginTop: '70px',
    paddingBottom: '50px'
  },
  center: {
    textAlign: 'center'
  }
})

const Favorite = () => {
  const classes = useStyle();

  return(
    <div>
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <center><SettingsIcon style={{ fontSize: '50px' }}/></center>
              <Typography variant="h5" className={classes.center}>
                No favorite Setting(s) yet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    </Slide>
    </div>
  )
}

export default Favorite;
