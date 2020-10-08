import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Snackbar from '@material-ui/core/Snackbar';
import FaceIcon from '@material-ui/icons/Face';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import TranslateIcon from '@material-ui/icons/Translate';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import './settings.scss';
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
  },
  meta: {
    right: '0',
    align: 'end',
    position: 'absolute'
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginRight: '10px',
    right: '-74%',
    backgroundColor: '#000'
  }
}));

const Settings = ({ history }) => {
  const classes = useStyles();
  const [snack, showSnack] = useState(true);
  const [value, setValue] = useState(0);
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

  setTimeout(() => showSnack(false), 3000);
  return (
    <div>
    <Snackbar
       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
       open={snack}
       onClose={() => showSnack(false)}
       message="Review your Settings to your taste"
       key={'bottom' + 'center'}
     />
    <AppBar position="static">
      <Toolbar variant="dense">
      <Tooltip title="Back">
      <IconButton
      className={classes.menuButton}
        edge="start"
        onClick={() => history.goBack()}
        color="inherit">
        <ArrowBackIcon />
      </IconButton>
      </Tooltip>
        <Typography variant="h6" color="inherit">
          Settings
        </Typography>
        <Tooltip title={window.process.env.username}>
        <Avatar aria-label="avatar" className={classes.avatar}>{window.process.env.username[0]}</Avatar>
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

    </List>
     <Divider variant="middle" />
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="bottomNav"
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default Settings;
