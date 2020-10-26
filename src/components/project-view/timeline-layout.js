import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { aio } from '../../database';
import './project-view.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
  paper: {
   padding: '6px 16px',
 },
 secondaryTail: {
   backgroundColor: theme.palette.secondary.main,
 }
}));

const currentProject = window.localStorage.getItem('currentproject');
let count = 0;

export const SimpleTimel = (data) => {
  const [additional, setAdd] = useState([]);
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => setSelectedDate(date);

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const [metaData, setMetaData] = useState('')
  const handleMeta = (event) => setMetaData(event.target.value);
  const [timelines, setTimelines] = useState([]);
  const addTimeline = () => {
    setTimelines(timelines.concat({ timeline: value , date: selectedDate, count, metadata: metaData, type: 'simple' }))
    count++;
  }

  const saveTimeline = () => {
    try {
      aio(`${currentProject}.timelines`, timelines)
      alert('Timeline Saved in the ' + currentProject + ' project')
    } catch(err) {
      alert(err);
    }
  }

  return(
    <div>
    <Alert severity="info" color="info">The text fields are multilined!</Alert>
    <center>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={create}
              onChange={() => setCreate(!create)}
              name="checkedB"
              color="primary"
            />
          }
          label="Add Timeline"
        />
      </FormGroup>
    </center>
    {create ?
      <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6} className="create--timeline">
              <Paper elevation={4}>
                <Typography variant="h6" align="center" component="p" className="create--timeline--heading">Add a timeline</Typography>
                 <p className="little--space"/>
                <center className={classes.root}>
                  <TextField label="Timeline" variant="filled" multiline rowsMax={2} onChange={handleChange}/>
                  <p />
                  <TextField label="Timeline MetaData" variant="filled" multiline rowsMax={3} onChange={handleMeta}/>
                </center>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify="space-around">
                   <KeyboardTimePicker
                     margin="normal"
                     id="time-picker"
                     label="Time"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                       'aria-label': 'change time',
                     }}
                   />
                 </Grid>
                 <div className="sp">
                 <Button color="primary" onClick={addTimeline}>Add Timeline</Button>
                 {timelines.length > 0 && <div className="button--space">
                    <Button variant="contained" color="primary" onClick={saveTimeline}>Done</Button>
                    </div>}
                 </div>
                  <p className="space"/>
               </MuiPickersUtilsProvider>
              </Paper>

              <List>
                { timelines.length > 0 && timelines.map(t => {
                  return(
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={t.date.toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}

                {data.data && data.data.length > 0 && additional.map(t => {
                  return (
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={new Date(t.date).toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs={false} sm={3}/>
          </Grid>
        </Grid>
      </div>
      :
      <div>
          <Timeline align="alternate">
            { timelines.length > 0 && timelines.map(t => {
              return(
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{t.timeline}</TimelineContent>
                </TimelineItem>
              )
            })}
            {data.data && data.data.length > 0 && data.data.map(t => {
              return (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{t.timeline}</TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
      </div>
    }
    </div>
  )
}

export const ColoredTimel = (data) => {
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => setSelectedDate(date);

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const [metaData, setMetaData] = useState('')
  const handleMeta = (event) => setMetaData(event.target.value);
  const [timelines, setTimelines] = useState([]);
  const addTimeline = () => {
    setTimelines(timelines.concat({ timeline: value , date: selectedDate, count, metadata: metaData, type: 'colored' }))
    count++;
  }
  const saveTimeline = () => {
    try {
      aio(`${currentProject}.timelines`, timelines)
      alert('Timeline Saved in the ' + currentProject + ' project')
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div>
    <Alert severity="info" color="info">The text fields are multilined!</Alert>
    <center>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={create}
              onChange={() => setCreate(!create)}
              name="checkedB"
              color="primary"
            />
          }
          label="Add Timeline"
        />
      </FormGroup>
    </center>
    {create ?
      <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6} className="create--timeline">
              <Paper elevation={4}>
                <Typography variant="h6" align="center" component="p" className="create--timeline--heading">Add a timeline</Typography>
                 <p className="little--space"/>
                <center className={classes.root}>
                  <TextField label="Timeline" variant="filled" multiline rowsMax={2} onChange={handleChange}/>
                  <p />
                  <TextField label="Timeline MetaData" variant="filled" multiline rowsMax={3} onChange={handleMeta}/>
                </center>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify="space-around">
                   <KeyboardTimePicker
                     margin="normal"
                     id="time-picker"
                     label="Time"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                       'aria-label': 'change time',
                     }}
                   />
                 </Grid>
                 <div className="sp">
                 <Button color="primary" onClick={addTimeline}>Add Timeline</Button>
                 {timelines.length > 0 && <div className="button--space">
                    <Button variant="contained" color="primary" onClick={saveTimeline}>Done</Button>
                    </div>}
                 </div>
                  <p className="space"/>
               </MuiPickersUtilsProvider>
              </Paper>

              <List>
                { timelines.length > 0 && timelines.map(t => {
                  return(
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={t.date.toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}

                {data.data && data.data.length > 0 && data.data.map(t => {
                  return (
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={new Date(t.date).toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs={false} sm={3}/>
          </Grid>
        </Grid>
      </div>
      :
    <div>
      <Timeline align="alternate">
      { timelines.length > 0 && timelines.map(t => {
        return (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary"/>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{t.timeline}</TimelineContent>
          </TimelineItem>
        )
      })}
      {data.data && data.data.length > 0 && data.data.map(t => {
        return (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{t.timeline}</TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
    </div>
  }
  </div>
  )
}

export const OutlinedTimel = (data) => {
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => setSelectedDate(date);

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const [metaData, setMetaData] = useState('')
  const handleMeta = (event) => setMetaData(event.target.value);
  const [timelines, setTimelines] = useState([]);
  const addTimeline = () => {
    setTimelines(timelines.concat({ timeline: value , date: selectedDate, count, metadata: metaData, type: 'outlined' }))
    count++;
  }
  const saveTimeline = () => {
    try {
      aio(`${currentProject}.timelines`, timelines)
      alert('Timeline Saved in the ' + currentProject + ' project')
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div>
    <Alert severity="info" color="info">The text fields are multilined!</Alert>
    <center>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={create}
              onChange={() => setCreate(!create)}
              name="checkedB"
              color="primary"
            />
          }
          label="Add Timeline"
        />
      </FormGroup>
    </center>
    {create ?
      <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6} className="create--timeline">
              <Paper elevation={4}>
                <Typography variant="h6" align="center" component="p" className="create--timeline--heading">Add a timeline</Typography>
                 <p className="little--space"/>
                <center className={classes.root}>
                  <TextField label="Timeline" variant="filled" multiline rowsMax={2} onChange={handleChange}/>
                  <p />
                  <TextField label="Timeline MetaData" variant="filled" multiline rowsMax={3} onChange={handleMeta}/>
                </center>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify="space-around">
                   <KeyboardTimePicker
                     margin="normal"
                     id="time-picker"
                     label="Time"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                       'aria-label': 'change time',
                     }}
                   />
                 </Grid>
                 <div className="sp">
                 <Button color="primary" onClick={addTimeline}>Add Timeline</Button>
                 {timelines.length > 0 && <div className="button--space">
                    <Button variant="contained" color="primary" onClick={saveTimeline}>Done</Button>
                    </div>}
                 </div>
                  <p className="space"/>
               </MuiPickersUtilsProvider>
              </Paper>

              <List>
                { timelines.length > 0 && timelines.map(t => {
                  return(
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={t.date.toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}

                {data.data && data.data.length > 0 && data.data.map(t => {
                  return (
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={new Date(t.date).toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}

              </List>
            </Grid>
            <Grid item xs={false} sm={3}/>
          </Grid>
        </Grid>
      </div>
      :
      <Timeline align="alternate">
      { timelines.length > 0 && timelines.map(t => {
        return (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{t.timeline}</TimelineContent>
          </TimelineItem>
        )
      })}
      {data.data && data.data.length > 0 && data.data.map(t => {
        return (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{t.timeline}</TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
    }
    </div>
  )
}

export const OppositeTimel = (data) => {
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => setSelectedDate(date);

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const [metaData, setMetaData] = useState('')
  const handleMeta = (event) => setMetaData(event.target.value);
  const [timelines, setTimelines] = useState([]);
  const addTimeline = () => {
    setTimelines(timelines.concat({ timeline: value , date: selectedDate, count, metadata: metaData, type: 'opposite' }))
    count++;
  }
  const saveTimeline = () => {
    try {
      aio(`${currentProject}.timelines`, timelines)
      alert('Timeline Saved in the ' + currentProject + ' project')
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div>
    <Alert severity="info" color="info">The text fields are multilined!</Alert>
    <center>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={create}
              onChange={() => setCreate(!create)}
              name="checkedB"
              color="primary"
            />
          }
          label="Add Timeline"
        />
      </FormGroup>
    </center>
    {create ?
      <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6} className="create--timeline">
              <Paper elevation={4}>
                <Typography variant="h6" align="center" component="p" className="create--timeline--heading">Add a timeline</Typography>
                 <p className="little--space"/>
                <center className={classes.root}>
                  <TextField label="Timeline" variant="filled" multiline rowsMax={2} onChange={handleChange}/>
                  <p />
                  <TextField label="Timeline MetaData" variant="filled" multiline rowsMax={3} onChange={handleMeta}/>
                </center>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify="space-around">
                   <KeyboardTimePicker
                     margin="normal"
                     id="time-picker"
                     label="Time"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                       'aria-label': 'change time',
                     }}
                   />
                 </Grid>
                 <div className="sp">
                 <Button color="primary" onClick={addTimeline}>Add Timeline</Button>
                 {timelines.length > 0 && <div className="button--space">
                    <Button variant="contained" color="primary" onClick={saveTimeline}>Done</Button>
                    </div>}
                 </div>
                  <p className="space"/>
               </MuiPickersUtilsProvider>
              </Paper>

              <List>
                { timelines.length > 0 && timelines.map(t => {
                  return(
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={t.date.toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
                {data.data && data.data.length > 0 && data.data.map(t => {
                  return (
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={new Date(t.date).toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs={false} sm={3}/>
          </Grid>
        </Grid>
      </div>
      :
      <Timeline align="alternate">
      { timelines.length > 0 && timelines.map(t => {
        return (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{t.date.toDateString()}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{t.timeline}</Typography>
            </TimelineContent>
          </TimelineItem>
        )
      })
      }
      {data.data && data.data.length > 0 && data.data.map(t => {
        return (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{new Date(t.date).toDateString()}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{t.timeline}</Typography>
            </TimelineContent>
          </TimelineItem>
        )
      })}

      </Timeline>
    }
    </div>
  )
}

export const AdvancedTimel = (data) => {
  const classes = useStyles();
  const [create, setCreate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => setSelectedDate(date);

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const [metaData, setMetaData] = useState('')
  const handleMeta = (event) => setMetaData(event.target.value);
  const [timelines, setTimelines] = useState([]);
  const addTimeline = () => {
    setTimelines(timelines.concat({ timeline: value , date: selectedDate, count, metadata: metaData, type: 'advanced' }))
    count++;
  }
  const saveTimeline = () => {
    try {
      aio(`${currentProject}.timelines`, timelines)
      alert('Timeline Saved in the ' + currentProject + ' project')
    } catch(err) {
      alert(err);
    }
  }

  return(
    <div>
    <Alert severity="info" color="info">The text fields are multilined!</Alert>
    <center>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={create}
              onChange={() => setCreate(!create)}
              name="checkedB"
              color="primary"
            />
          }
          label="Add Timeline"
        />
      </FormGroup>
    </center>
    {create ?
      <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
            <Grid item xs={12} sm={6} className="create--timeline">
              <Paper elevation={4}>
                <Typography variant="h6" align="center" component="p" className="create--timeline--heading">Add a timeline</Typography>
                 <p className="little--space"/>
                <center className={classes.root}>
                  <TextField label="Timeline" variant="filled" multiline rowsMax={2} onChange={handleChange}/>
                  <p />
                  <TextField label="Timeline MetaData" variant="filled" multiline rowsMax={3} onChange={handleMeta}/>
                </center>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify="space-around">
                   <KeyboardTimePicker
                     margin="normal"
                     id="time-picker"
                     label="Time"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                       'aria-label': 'change time',
                     }}
                   />
                 </Grid>
                 <div className="sp">
                 <Button color="primary" onClick={addTimeline}>Add Timeline</Button>
                 {timelines.length > 0 && <div className="button--space">
                    <Button variant="contained" color="primary" onClick={saveTimeline}>Done</Button>
                    </div>}
                 </div>
                  <p className="space"/>
               </MuiPickersUtilsProvider>
              </Paper>

              <List>
                { timelines.length > 0 && timelines.map(t => {
                  return(
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={t.date.toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
                { data.data && data.data.length > 0 && data.data.map(t => {
                  return (
                    <ListItem button>
                      <ListItemText primary={t.timeline} secondary={new Date(t.date).toLocaleDateString()} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(chipToDelete) => setTimelines((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs={false} sm={3}/>
          </Grid>
        </Grid>
      </div>
      :
      <div>
      <Timeline align="alternate">
            { timelines.length > 0 && timelines.map(t => {
              return(
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                      { t.date.toDateString() }
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        {t.timeline}
                      </Typography>
                    <Typography>{t.metadata}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
            {data.data && data.data.length > 0 && data.data.map(t => {
              return (
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                      { new Date(t.date).toDateString() }
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        {t.timeline}
                      </Typography>
                    <Typography>{t.metadata}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              )
            })}

          </Timeline>
        </div>
    }
    </div>
  )
}
