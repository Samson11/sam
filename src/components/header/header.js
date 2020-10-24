import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { verifyValidation } from '../../database';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  menuButton: {
     marginRight: theme.spacing(2)
  },
  endButton: {
     marginRight: theme.spacing(1)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: '85.4vh',
    borderRadius: '0'
  },
  meta: {
    right: '0',
    align: 'end',
    position: 'absolute'
  },
  avatar: {
    marginRight: theme.spacing(2),
    right: '-78%',
    backgroundColor: theme.palette.primary.light
  },
  minimise: {
     marginLeft: theme.spacing(1)
  }
}));

const Header = (data) => {
  const classes = useStyles();
  return(
    <AppBar position="static">
      <Toolbar variant="dense">
      <Tooltip title="Back">
      <IconButton
      className={classes.menuButton}
        edge="start"
        onClick={() => data.history.goBack()}
        color="inherit">
        <ArrowBackIcon />
      </IconButton>
      </Tooltip>
        <Typography variant="h6" color="inherit">
          {data.title}
        </Typography>
        <Tooltip title={window.process.env.username}>
        {verifyValidation('profile') ? <Avatar aria-label="avatar" src={window.localStorage.getItem('profile')} className={classes.avatar}></Avatar> : <Avatar aria-label="avatar" className={classes.avatar}>{window.process.env.username[0]}</Avatar>}
        </Tooltip>
        <div className={classes.meta}>
        <Tooltip title="Close">
        <IconButton
          className={classes.endButton}
          edge="end"
          onClick={() => ipcRenderer.send('close')}
          color="inherit">
          <CloseIcon />
        </IconButton>
        </Tooltip>
        </div>
      </Toolbar>
    </AppBar>

  );
}

export default withRouter(Header);
