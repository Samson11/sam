import React, { useEffect, useState, Component } from 'react';
import Header from '../header/header';
import { search, aio, getData } from '../../database';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import './project-view.scss';

const useStyles = makeStyles((theme) => ({
  whole: {
    height: '100vh',
    width: '100%'
  },
  card: {
    marginTop: '60px'
  },
  info: {
    paddingBottom: '30px',
    textAlign: 'center'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  textspace: {
    flexBasis: '60.33%'
  },
  textmargin: {
    flexBasis: '10.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    }
  }
}));


class GetProjectData extends Component {
  state = {
    data: [],
    requirements: [],
    timelines: [],
    image: ''
  }

  componentDidMount() {
    const res = async () => {
      const name = this.props.location.pathname.split('/viewer/')[1]
      const datum = await search('projects', 'id', name);
      this.setState({ data: datum })
      const title = datum.map(a => a.title)[0];

      if(window.localStorage.getItem(`${title}.complete`)){
        this.setState({ image: window.localStorage.getItem(`${title}.complete`) })
      }

      getData(`${title}.requirements`)
      .then(d => this.setState({ requirements: d[0] }))
      .catch(err => this.setState({ requirements: [] }))
      getData(`${title}.timelines`)
      .then(d => this.setState({ timelines: d }))
      .catch(err => this.setState({ timelines: [] }))

    };
    res()
  }

  render() {
    return this.state.data ? <Viewer data={this.state.data} requirements={this.state.requirements} timelines={this.state.timelines} /> : <Viewer data="Hii" />
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Viewer = (data) => {
  const classes = useStyles();
  const info = data.data;
  const d = info.map(a => a.title)[0];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState('Controlled');
  const handleChange = (event) => setValue(event.target.value);

  const [requirements, setRequirements] = useState([]);

  const saveRequirements = () => {
     aio(`${d}.requirements`, requirements)
  }

  const[image, setImage] = useState('');

  const add = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) =>  {
        setImage(e.target.result)
        const obj = { profilePicture: e.target.result }
        window.localStorage.setItem(`${d}.complete`, e.target.result)
        /**verifyValidation('profile')
        .then((res) => {
          updateRow('profile', { id: this.state.imgId },obj).then(() => this.setState({ ifImage: true, imgSrc: e.target.result }))
        })
        .catch(err => addTable('profile').then(() =>
          addData('profile', obj).then(() => this.setState({ ifImage: true, imgSrc: e.target.result }))
      ))**/
    }
  }

  const a = info.map(a => a.title)[0];
  window.localStorage.setItem('currentproject', a);

  return (
    <div>
    {/** Dialog  For Timeline */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
         <AppBar className={classes.appBar}>
           <Toolbar variant="dense">
             <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
               <CloseIcon />
             </IconButton>
             <Typography variant="h6" className={classes.title}>
               Timeline
             </Typography>
           </Toolbar>
         </AppBar>
         <List>
            <Typography variant="h6" component="p" className="timeline--header">Choose a timeline</Typography>
           <ListItem button component={Link} to='/timeline/basic'>
             <ListItemText primary="Basic Timeline" secondary="A simple and short timeline to convey your ideas" />
           </ListItem>

           <ListItem button component={Link} to='/timeline/colored'>
             <ListItemText primary="Colored Timeline" secondary="A simple colorful timeline to illustrate your ideas" />
           </ListItem>
           <ListItem button component={Link} to='/timeline/opposite'>
             <ListItemText primary="Opposite Timeline" secondary="Similar to Colored but has an alternating layout" />
           </ListItem>
           <ListItem button component={Link} to='/timeline/outlined'>
             <ListItemText primary="Outlined Timeline" secondary="Similar to Colored but has outlined icons" />
           </ListItem>
           <ListItem button component={Link} to='/timeline/advanced'>
             <ListItemText primary="Advanced Timeline" secondary="A complex and powerful timeline to express your ideas with time and steps" />
           </ListItem>
         </List>
       </Dialog>

      { info && info.length > 0 && info.map((a) => {
        return(
          <div>
          <Header title={a.title} />
          <Grid container direction="column">
            <Grid item container spacing={2} style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Grid item xs={false} sm={3}>
                <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000 } : {})}>
                  <Paper className={classes.card} elevation={4}>
                  <Typography variant="h6" component="div" className="requirements--header">
                    Requirements
                  </Typography>
                  <List style={{ width: '100%' }}>
                    {data.requirements && data.requirements.length > 0 && data.requirements.map((value) => {
                      if(value.length > 0) {
                        return (
                          <ListItem key={value} role={undefined} dense button>
                            <ListItemText id={value} primary={value} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete" onClick={(value) => setRequirements((chips) => chips.filter((chip) => chip.key !== value.key))}>
                                <DeleteOutlineIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      } else {
                        return(
                          <Typography variant="h6" component="div" className="requirements--header">
                            You have no requirement setup. Create some now!
                          </Typography>
                        )
                      }
                    })}
                  </List>
                  <center>
                  <Fab color="primary" aria-label="add" size="small" style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <AddIcon />
                  </Fab>
                  </center>
                  </Paper>
                </Grow>
              </Grid>

              <Grid item xs={false} sm={6}>
              <Zoom in={true}>
              <Paper className={classes.card} elevation={4}>
                <Typography variant="h4" component="div" className="view__header">
                  {a.title}
                </Typography>

                <p className="space" />
                <Typography variant="h6" component="p" className="timeline--notice">
                  {data.timelines && data.timelines.length > 0 ? `${data.timelines.length} timelines in Session` : 'You have no timeline setup on this project.\n\n Lets start by creating a timeline'}
                </Typography>
                <center>
                  {data.timelines && data.timelines.length > 0 ? <Button component={Link} to="/timeline-preview">View Timeline</Button> : <Button onClick={handleClickOpen}>Start a Timeline</Button>}
                </center>
                <div className="space" />
              </Paper>
              </Zoom>

              <Accordion elevation={4}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header">
                <div className={classes.column}>
                  <Typography className={classes.heading}>Requirements</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>Setup Requirements</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={classes.textspace}>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="filled-multiline-static"
                    label="Requirement"
                    multiline
                    rows={2}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={() => setRequirements((old) => [...old, value])}
                  />
                </form>
                <List style={{ width: '100%' }}>
                  {requirements && requirements.map((value) => {
                    return (
                      <ListItem key={value} role={undefined} dense button>
                        <ListItemText id={value} primary={value} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={(value) => setRequirements((chips) => chips.filter((chip) => chip.key !== value.key))}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                </div>
                <div className={classes.textmargin} />
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Add all the necessary requirements needed to create, start or replicate this project
                    <br />
                    <a href="#secondary-heading-and-columns" className={classes.link}>
                      Learn more
                    </a>
                  </Typography>
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size="small" color="primary" onClick={saveRequirements}>
                  Save
                </Button>
              </AccordionActions>
              </Accordion>

              <Accordion elevation={4}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header">
                <div className={classes.column}>
                  <Typography className={classes.heading}>Overview</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>Finished Overview</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={classes.textspace}>
                {data.image !== '' || null ?
                  <img src={window.localStorage.getItem(`${d}.complete`)} className="overview--image" alt="No image Yet" />
                  : <div>Add an image</div>
                }
                  <input
                    accept="image/*"
                    className="input"
                    id="contained-button-file"
                    onChange={add}
                    type="file"
                  />
                  <center>
                  <label htmlFor="contained-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                  </label>
                  </center>
                </div>
                <div className={classes.textmargin} />
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Add an image to indicate how the project will look at completion.
                    This step is optional.
                    <br />
                    <a href="#secondary-heading-and-columns" className={classes.link}>
                      Learn more
                    </a>
                  </Typography>
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size="small" color="primary" onClick={saveRequirements}>
                  Save
                </Button>
              </AccordionActions>
              </Accordion>

              </Grid>
              <Grid item xs={false} sm={3}>
              <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 3000 } : {})}>
                <Paper className={classes.card} elevation={4}>
                <Typography variant="h6" component="div" className="requirements--header">
                  Todos
                </Typography>
                <List style={{ width: '100%' }}>
                  {data.timelines && data.timelines.length > 0 && data.timelines.map((value) => {
                    if(value.length > 0) {
                      return (
                        <ListItem key={value.timeline} role={undefined} dense button>
                          <ListItemText id={value.timeline} primary={value.timeline} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={(value) => setRequirements((chips) => chips.filter((chip) => chip.key !== value.timeline))}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    } else {
                      return(
                        <Typography variant="h6" component="div" className="requirements--header">
                          You have no todos setup. Create some now!
                        </Typography>
                      )
                    }
                  })}
                </List>
                <center>
                <Fab color="primary" aria-label="add" size="small" style={{ marginBottom: '15px', marginTop: '20px' }}>
                <SpellcheckIcon />
                </Fab>
                </center>
                </Paper>
              </Grow>
              </Grid>
            </Grid>
          </Grid>
        </div>
        )
      })}
    </div>
  )
}

export default GetProjectData;
