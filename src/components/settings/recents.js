import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import FaceIcon from '@material-ui/icons/Face';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

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
  }
}));

const Recent = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <Paper className={classes.paper}>
    <List subheader={<ListSubheader>Frequent Settings</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        <ListItemSecondaryAction>
          <Switch
            color="primary"
            edge="end"
            onChange={handleToggle('wifi')}
            checked={checked.indexOf('wifi') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        <ListItemSecondaryAction>
          <Switch
            color="primary"
            edge="end"
            onChange={handleToggle('bluetooth')}
            checked={checked.indexOf('bluetooth') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DataUsageIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-data" primary="Data Usage" />
        <ListItemSecondaryAction>
          <Switch
            color="primary"
            edge="end"
            onChange={handleToggle('data')}
            checked={checked.indexOf('data') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-data' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-face" primary="Face Recognition" />
        <ListItemSecondaryAction>
          <Switch
            color="primary"
            edge="end"
            onChange={handleToggle('face')}
            checked={checked.indexOf('face') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-face' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          { checked.indexOf('sync') !== -1 ? <SyncIcon /> : <SyncDisabledIcon /> }
        </ListItemIcon>
        <ListItemText id="switch-list-label-sync" primary={checked.indexOf('sync') !== -1 ? 'Disable Auto Sync' : 'Enable Auto Sync'} />
        <ListItemSecondaryAction>
          <Switch
            color="primary"
            edge="end"
            onChange={handleToggle('sync')}
            checked={checked.indexOf('sync') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-checked' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-language" primary="Language" />
        <ListItemSecondaryAction>
        <Typography variant="subtitle1" color="inherit">
          {navigator.language}
        </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-theme" primary="Dark Theme" />
        <ListItemSecondaryAction>
        <Switch
          color="primary"
          edge="end"
          onChange={handleToggle('theme')}
          checked={checked.indexOf('theme') !== -1}
          inputProps={{ 'aria-labelledby': 'switch-list-label-theme' }}
        />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RecordVoiceOverIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-speech" primary="Speech Recignition" />
        <ListItemSecondaryAction>
        <Switch
          color="primary"
          edge="end"
          onChange={handleToggle('speech')}
          checked={checked.indexOf('speech') !== -1}
          inputProps={{ 'aria-labelledby': 'switch-list-label-speech' }}
        />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    </Paper>
    </Slide>
  )
}

export default Recent;
