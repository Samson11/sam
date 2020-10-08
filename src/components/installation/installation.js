import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { Grid, Typography } from '@material-ui/core';
import './installation.scss';
const db = window.require('electron-db')

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

  const addData = () => {
    let obj = new Object();
    obj.name = window.process.env.username;
    obj.time = new window.Date();
    obj.installed = true;
    db.insertTableContent('installation', obj, (succ, msg) => {
      if(succ) {
        new Notification('S.A.M', { body: 'Installation Complete.\nFor full functionality a restart is required.'})
        ipcRenderer.send('createBrowserWindow', 'first-project', false, false)
      } else {
        alert('Could Install')
      }
    })
  }

  const done = () => {
    db.createTable('installation', (succ, msg) => {
      if(db.valid('installation')) {
        db.clearTable('installation', (s, m) => addData())
      }
      else if(succ) {
        addData()
      } else {
        alert(`Installation Failed because ${msg}`)
      }
    })
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
