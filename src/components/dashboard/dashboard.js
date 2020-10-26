import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DashboardHeader from './dashboardHeader';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GetProjects from '../projects/projects';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    transform: 'translateZ(0px)',
    flexGrow: 1
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
    padding: theme.spacing(3)
  },
  card: {
    marginBottom: '10px',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  center: {
    textAlign: 'center'
  },
  bottom: {
    bottom: '-55px',
    position: 'relative',
    right: '-48%'
  }
}));

const Dashboard = () => {
  const actions = [
    { icon: <AddIcon />, name: 'Create Project', link: '/create-project'},
    { icon: <VideocamIcon />, name: 'Record Video', link: '/choose-screen' }
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <DashboardHeader />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000 } : {})}>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.card}>
                <Typography variant="h6" className={classes.center}>
                  Recent Projects
                </Typography>
              </Paper>
              <GetProjects />
              </Grid>
            </Grow>
        </Grid>

        <div>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.bottom}
            hidden={false}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up" >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
                component={Link}
                to={action.link}
              />
            ))}
          </SpeedDial>
          </div>
      </main>
    </div>
    )
}

export default Dashboard;
