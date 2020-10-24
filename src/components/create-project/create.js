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
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  input: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
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

const top100Films = [
  { title: window.process.env.username, year: new Date().getYear() },
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

const CreateProject = ({ history }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [rating, setRating] = React.useState(2);
  const handleDelete = (chipToDelete) => () => setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.title));
  const add = (label) => setChipData(...chipData, label)
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const [textInputs, setTextInputs] = useState({
    projectName: '',
    projectDescription: ''
  });

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const [category, setCategory] = useState('');
  const [title,setTitle] = useState('');
  const handleChange = (event) => setCategory(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const [data, setData] = useState('');

  const create = () => {
    const { projectName, projectDescription } = textInputs;
    const obj = {
      title,
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

            { activeStep === 0 &&
                <div>

                <p className="txtspace" />
                 <TextField label="Project title" variant="filled" className={classes.text} onChange={handleTitle} />
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
                </div>
            }

            { activeStep === 1 &&
                <div>

                <div className={classes.root}>
                <div className={classes.input}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(event, value) => add(value)}
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[top100Films[0]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tags"
                      placeholder="Type a tag"
                      onChange={(event) => setData(event.target.value)}
                      onKeyDown={e => {
                       if (e.keyCode === 13 && e.target.value) {
                         setChipData((old) => [...old, { title: e.target.value }]);
                       }
                     }}
                    />
                  )}
                />
              </div>

              {/**
                <IconButton aria-label="add" onClick={add}>
                    <AddIcon />
                  </IconButton>
              */}
                 </div>
                </div>
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
