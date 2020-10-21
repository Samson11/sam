import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter, Link } from 'react-router-dom';
import { aio } from '../../database';
import './create.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  text: {
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    width: '50%'
  },
  header: {
   display: 'flex',
   alignItems: 'center',
   height: 50,
   paddingLeft: theme.spacing(2),
   backgroundColor: theme.palette.background.default,
 },
 formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width:'50%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const tutorialSteps = [
  { label: 'Project Information' },
  { label: 'Project tags' }
];

const categories = [
  'Web Design',
  'Web Development',
  'UI/UX',
  'Mobile App Development',
  'Video Editing',
  'Business',
  'Sports',
  'Engineering',
  'Comedy'
]

const CreateProject = ({ history }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [rating, setRating] = React.useState(2);
  const handleDelete = (chipToDelete) => () => setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  const add = () => setChipData(oldArray => [...oldArray, { key: 5, label: 'Samson'}])
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const [textInputs, setTextInputs] = useState({
    projectName: '',
    projectDescription: ''
  });

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const [category, setCategory] = React.useState('');
  const handleChange = (event) => setCategory(event.target.value);

  const create = () => {
    const { projectName, projectDescription } = textInputs;
    const obj = {
      projectName,
      projectDescription,
      category,
      rating,
      tags: chipData,
      time: new window.Date()
    };

    if((projectName === '' || null) || (projectDescription === '' || null)) {
      alert('Fill in all the fields')
    } else {
      aio('projects', obj)
      alert('Project Created')
    }
  }

  const updatePn = (e) => {
    const { projectName } = textInputs;
    setTextInputs({projectName: e.target.value })
  }

  const desc = (e) => {
    const { projectDescription } = textInputs;
    setTextInputs({projectDescription: e.target.value })
  }
  return (
    <div>
    <Dialog
      fullScreen={fullScreen}
      open={true}
      aria-labelledby="create-project-dialog-title">
      <DialogTitle id="create-project-dialog-title">
        <IconButton onClick={() => history.goBack()}><CloseIcon style={{ height: '28px', width: '28px' }}/></IconButton>
         Create a Project (Step {activeStep + 1} of {tutorialSteps.length})</DialogTitle>
      <DialogContent>
        <DialogContentText>

          <Paper className="paper">
            <Paper square elevation={0} className={classes.header}>
              <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>

            { activeStep === 0 ?
                <div>

                <p className="txtspace" />
                 <TextField label="Project title" variant="filled" className={classes.text} onChange={updatePn} />
                 <p className="txtspace" />
                 <TextField label="Description" multiline rowsMax={4} className={classes.text} onChange={desc} />
                 <p className="txtspace" />

                 <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    onChange={handleChange}>

                    {categories.map((c) => (  <MenuItem value={c}>{c}</MenuItem>))}

                  </Select>
                  <FormHelperText>Select a category</FormHelperText>
                </FormControl>

                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Your Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
                </div> : console.log('Not First')
            }

            { activeStep === 1 ?
                <div>
                <Typography variant="h6">Tags</Typography>

                <div className={classes.root}>

                  {chipData.map((data) => {
                   return (
                     <li key={data.key}>
                       <Chip variant="outlined"
                         label={data.label}
                         onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                         className={classes.chip}
                       />
                     </li>
                   );
                 })}

                 <IconButton aria-label="add" onClick={add}>
                  <AddIcon />
                </IconButton>
                 </div>
                </div> : console.log('Not Second')
            }
          </Paper>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="primary">
        Back
      </Button>
      {activeStep < 1 ?
        <Button color="primary" size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
          Next
        </Button> :
        <Button color="primary" size="small" disabled={activeStep === maxSteps} onClick={create} component={Link} to="/home">
          Create
        </Button>
      }
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default withRouter(CreateProject);
