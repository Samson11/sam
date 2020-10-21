import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import { getData, verifyValidation } from '../../database';

const { ipcRenderer } = window.require('electron');
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  meta: {
    right: '0',
    align: 'end',
    position: 'absolute'
  },
  avatar: {
    marginRight: theme.spacing(3),
    right: '-76%',
    backgroundColor: theme.palette.primary.light
  },
  endButton: {
     marginRight: theme.spacing(1),
     marginLeft: theme.spacing(2)
  }
}));

const DashboardHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const close = () => ipcRenderer.send('close')

  return (
    <div>
    <CssBaseline />
    <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}>
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <Toolbar>
      <Tooltip title="Menu">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: open,
        })}
      >
        <MenuIcon />
      </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
      <Typography variant="h6" noWrap>
        Dashboard
      </Typography>
      </Tooltip>

      <Tooltip title={window.process.env.username}>
        {verifyValidation('profile') ? <Avatar aria-label="avatar" className={classes.avatar} src={window.localStorage.getItem('profile')}></Avatar> : <Avatar aria-label="avatar" className={classes.avatar}>{window.process.env.username[0]}</Avatar>}
      </Tooltip>

      <div className={classes.meta}>
      <Tooltip title="Close">
      <IconButton
        className={classes.endButton}
        color="inherit"
        aria-label="close"
        onClick={close}
        edge="end">
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </div>
    </Toolbar>
    </Slide>
  </AppBar>
  <Slide direction="left" in={true} mountOnEnter unmountOnExit>
  <Drawer
    variant="permanent"
    className={clsx(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}
    classes={{
      paper: clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      }),
    }}
  >
    <div className={classes.toolbar}>
      <Tooltip title="Close">
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
      </Tooltip>
    </div>
    <Divider />
    <List>
      <Tooltip title="Projects">
      <ListItem button key="Projects">
        <ListItemIcon><FolderSharedIcon /></ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      </Tooltip>

      <Tooltip title="Starred">
      <ListItem button key="Starred">
        <ListItemIcon><FolderSharedIcon /></ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
      </Tooltip>

      <Tooltip title="Subscriptions">
      <ListItem button key="Subscriptions" component={Link} to="/subscription">
        <ListItemIcon><PaymentIcon /></ListItemIcon>
        <ListItemText primary="Subscriptions" />
      </ListItem>
      </Tooltip>
    </List>
    <Divider />
    <List>
      {[
        {name: 'Account', link: '/profile', icon: 'AccountCircleIcon'},
        {name: 'Settings', link: '/settings', icon: 'SettingsIcon'}
      ].map((data) => (
        <Tooltip title={data.name}>
        <ListItem component={Link} button key={data.name} to={data.link}>
          <ListItemIcon>{data.name === 'Settings' ? <SettingsIcon /> : <AccountCircleIcon />}</ListItemIcon>
          <ListItemText primary={data.name} />
        </ListItem>
        </Tooltip>
      ))}
    </List>
  </Drawer>
  </Slide>
    </div>
  )
}

export default DashboardHeader;
