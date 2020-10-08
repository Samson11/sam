import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Face from '../face-capture/face';
import Authentication from '../authentication/authentication';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import './FirstTime.scss';
import { Link } from 'react-router-dom';
const { ipcRenderer } = window.require('electron')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  pad: {
    paddingRight: '30px'
  },
  menuButton: {
     marginRight: theme.spacing(2)
  }
}));

const FirstTime = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const closeApp = () => ipcRenderer.send('close');

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar variant="dense">
      <IconButton
      className={classes.menuButton}
        edge="start"
        onClick={closeApp}
        color="inherit">
        <CloseIcon />
      </IconButton>
        <Typography variant="h6" color="inherit">
          {activeStep === 0 ? 'Create My Profile' : 'Face Recognition'}
        </Typography>
      </Toolbar>
    </AppBar>
    {activeStep === 0 ? <Authentication number={activeStep} /> : <Face />}
      <MobileStepper
         variant="progress"
         steps={3}
         position="bottom"
         activeStep={activeStep}
         className={classes.root}
         nextButton={ activeStep >= 2 ?
           <Button component={Link} to='/settings'>
            Finish
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button> :
           <Button size="small" onClick={handleNext} disabled={activeStep === 4} className={classes.pad}>
            Next
           {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
         </Button>

       }
       backButton={
         <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
           {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
           Back
         </Button>
       }
     />
    </div>
  )
}

export default FirstTime;
