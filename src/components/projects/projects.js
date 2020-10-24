import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import { getData } from '../../database';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: '40px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#000',
  },
  chipList: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.3),
  }
}));

const GetProjects = () => {
  const [proj,setProject] = useState([]);
  useEffect(() => {
    const res = async () => {
        const data = await getData('projects');
        const b = data.map(d => d)
        setProject(...proj, b)
    };
    res();
  }, [])

  useEffect(() => console.log(proj), [proj])
  return proj.length > 1 ? <Projects projects={proj}/> : <EmptyProjects />;
}

const Projects = (projects) => {
  const classes = useStyles();
  const myProjects = projects.projects;

  return (
    <Grid container spacing={2}>
      {myProjects.map((p) => {
        return (
          <Grid item xs={4} justify="center">
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {p.category[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="delete">
                  <DeleteOutlineIcon />
                </IconButton>
              }
              title={p.title}
              subheader={new Date(p.time).toDateString()}
            />
            <div className={classes.chipList}>
            {p.tags.map((data) => {
             return (
               <li key={data.key}>
                 <Chip variant="outlined"
                   label={data.label} className={classes.chip}/>
               </li>
             );
           })}
           </div>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {p.projectDescription}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" component={Link} to={'/viewer/' + p.id}>View</Button>
            </CardActions>
          </Card>
        </Grid>
        )
      })}
    </Grid>
  );
}

const EmptyProjects = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title="No project"
        subheader="Create a project to see them here"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I'll be waiting right here.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GetProjects;
