import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { Grid, Typography } from '@material-ui/core';
import { addData, addTable, verifyValidation, clearTable } from '../../database';
import './installation.scss';

const useStyles = makeStyles((theme) => ({
  whole: {
    height: '100vh',
    width: '100%'
  },
  card: {
    marginTop: '60px'
  },
  progress: {
    height: '30px',
    width: '30px'
  }
}));

const Installation = () => {
  const { ipcRenderer } = window.require('electron')
  const classes = useStyles();
  const [prog, setProg] = useState(true);
  const [files, setFiles] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [settingup, settingupState] = useState(false)

  const updateUI = (files, updates, settingup) => {
    setTimeout(() => setFiles(true), 2000)
    setTimeout(() => setUpdates(true), 5000)
    setTimeout(() => settingupState(true), 9900)
  }

  const obj = {
    name: window.process.env.username,
    time: new window.Date(),
    installed: true
  };

  const clearAndAdd = () => {
    clearTable('installation')
    .then(() => {
      addTable('installation')
      addData('installation', obj)
      .then(() => {
        new Notification('S.A.M', { body: 'Installation Complete.\nFor full functionality a restart is required.'})
        ipcRenderer.send('createBrowserWindow', 'first-project', false, false)
      })
    })
  }

  const add = () => {
    addData('installation', obj)
    .then(() => {
      new Notification('S.A.M', { body: 'Installation Complete.\nFor full functionality a restart is required.'})
      ipcRenderer.send('createBrowserWindow', 'first-project', false, false)
    })
    .catch(err => alert(err))
  }

  const done = () => {
    addTable('installation')
    .then((succ) => {
      if(verifyValidation('installation')){
        clearTable('installation').then(() => add())
      } else if(succ){
        add()
      }
    })
    .catch(() => clearAndAdd())
  }

  updateUI(files, updates, settingup)
  setTimeout(() => setProg(false), 10000);

  return(
    <Paper className={classes.whole}>
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={3}/>
        <Grid item xs={12} sm={6}>
          <Zoom in={true}>
          <Paper className={classes.card}>
            <Typography variant="h4" component="div" className="auth__header">
              Installer
            </Typography>

            <ul className="install--options">
              <li className="install--option">
                <div className="install--option--text">
                  {files ? <DoneIcon edge="start" className="install--icon"/> : <CircularProgress color="primary" edge="start" className="install--icon" style={{ height: 30 }}/>}
                  Writing Files</div>
              </li>
              <li className="install--option">
                <div className="install--option--text">
                  {updates ? <DoneIcon edge="start" className="install--icon"/> : <CircularProgress color="primary" edge="start" className="install--icon"/>}
                  Writing Updates</div>
              </li>
              <li className="install--option">
                <div className="install--option--text">
                  {settingup ? <DoneIcon edge="start" className="install--icon"/> : <CircularProgress color="primary" edge="start" className="install--icon"/>}
                  Setting Up Machine</div>
              </li>
            </ul>
            <p className="space"/>
          </Paper>
          </Zoom>
          <p />
          <center>
            <Button variant="outlined" color="primary" onClick={done} align="center" disabled={prog}>Done</Button>
          </center>
        </Grid>
        <Grid item xs={false} sm={3} />
      </Grid>
    </Grid>
    </Paper>
  )
}

export default Installation;
