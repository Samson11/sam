import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import os from 'os';
import './requirements.scss';

const useStyle = makeStyles({
 whole: {
   height: '100vh',
   width: '100%'
 },
 card: {
   color: '#000',
   backgroundColor: '#fff',
   marginTop: '60px'
 },
 table: {
   minWidth: 350,
   color: '#000'
 },
 button: {
   marginBottom: '2px',
   justifyContent: 'flex-end'
 },
 small: {
   fontSize: '18px',
   paddingLeft: '10px',
   paddingRight: '10px',
   textAlign: 'center',
   paddingBottom: '7px',
   fontFamily: 'sans-serif,Segoe Ui'
 },
 link: {
   textDecoration: 'none'
 },
 head: {
    backgroundColor: '#000'
  }
})

const Requirements = () => {
  const classes = useStyle();
  const freeMemory = Math.floor(os.freemem());
  document.title = 'S.A.M | System Requirements';

  return (
    <Paper className={classes.whole}>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={3}/>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.card}>
              <Typography variant="h4" component="div" className="auth__header">
                System
              </Typography>

              <p className="space"/>
              <Typography variant="h6" component="p" className={classes.small}>
                Please wait while we check if your system can run S.A.M. optimally
              </Typography>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="desktop-table">
                  <TableHead>
                    <TableRow className={classes.head}>
                      <TableCell style={{color: 'white'}}>Specification</TableCell>
                      <TableCell style={{color: 'white'}} align="right">Found</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key="cpu">
                      <TableCell component="th" scope="row">CPU</TableCell>
                      <TableCell align="right">2</TableCell>
                    </TableRow>
                    <TableRow key="ram">
                      <TableCell component="th" scope="row">RAM</TableCell>
                      <TableCell align="right">{freeMemory} GB</TableCell>
                    </TableRow>
                    <TableRow key="user">
                      <TableCell component="th" scope="row">User Name</TableCell>
                      <TableCell align="right">{window.process.env.username}</TableCell>
                    </TableRow>
                    <TableRow key="os">
                      <TableCell component="th" scope="row">OS</TableCell>
                      <TableCell align="right">{window.process.platform}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              <p className="space"/>
            <Grid container item justify="flex-end">
               <Link to="/intro" className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button} endIcon={<ArrowForwardIcon />}>
                  Go Ahead
                </Button>
               </Link>
            </Grid>
          </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Requirements;
