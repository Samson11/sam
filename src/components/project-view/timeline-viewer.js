import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SimpleTimel, ColoredTimel, OutlinedTimel, AdvancedTimel, OppositeTimel } from './timeline-layout';
import { getData } from '../../database';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const currentProject = window.localStorage.getItem('currentproject');

const TimelineViewer = () => {
  const[data, setData] = useState([]);
  useEffect(() =>{
    async function getTime() {
      const d = await getData(`${currentProject}.timelines`);
      setData(...data, d[0])
    }
    getTime()
  }, [])
  const classes = useStyles();
  const [state, setAge] = useState('');

  const handleChange = (event) => {
   setAge(event.target.value);
  };

  return(
    <div>
      <Header title="Preview" />
        <FormControl className={classes.formControl}>
        <InputLabel>Preview State</InputLabel>
        <Select
          value={state}
          onChange={handleChange}>
          <MenuItem value={'basic'}>Basic</MenuItem>
          <MenuItem value={'opposite'}>Opposite</MenuItem>
          <MenuItem value={'colored'}>Colored</MenuItem>
          <MenuItem value={'outlined'}>Outlined</MenuItem>
          <MenuItem value={'advanced'}>Advanced</MenuItem>
        </Select>
      </FormControl>

      { state === 'basic' && <SimpleTimel data={data}/> }
      { state === 'opposite' && <OppositeTimel data={data}/> }
      { state === 'colored' && <ColoredTimel data={data}/> }
      { state === 'outlined' && <OutlinedTimel data={data}/> }
      { state === 'advanced' && <AdvancedTimel data={data}/> }

    </div>
  )
}

export default TimelineViewer;
