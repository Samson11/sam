import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Slide from '@material-ui/core/Slide';
import './authentication.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  authFields: {
    width: '70%',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    marginBottom: '20px',
    marginTop: '10px'
  }
}));

const Authentication = (data) => {
  const classes = useStyles();
  const [state, setState] = useState(true);
  const [regUI, setUI] = useState(true);

  const checkState = () => setState(!state)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

 const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Paper>
        <Grid container direction="column">
            <Grid item container>
              <Grid item xs={false} sm={3}/>
              <Grid item xs={12} sm={6}>
              {regUI ?
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Paper className="auth__paper">
                  <Typography variant="h5" className="auth__header--center">My Profile</Typography>
                  <p />
                  <Typography variant="h6" className="auth__header--center" component="p">
                    {window.process.env.username}, you would need to create an account that will be synced later
                  </Typography>

                  {/** Registration Form */}
                  <div className="auth__registration">
                    <center>
                      <TextField label="Name" variant="filled" className={classes.authFields}/>
                      <FormControl className={classes.authFields} variant="filled">
                       <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                       <FilledInput
                         id="filled-adornment-password"
                         type={values.showPassword ? 'text' : 'password'}
                         value={values.password}
                         onChange={handleChange('password')}
                         endAdornment={
                           <InputAdornment position="end">
                             <IconButton
                               aria-label="toggle password visibility"
                               onClick={handleClickShowPassword}
                               onMouseDown={handleMouseDownPassword}
                               edge="end"
                             >
                               {values.showPassword ? <Visibility /> : <VisibilityOff />}
                             </IconButton>
                           </InputAdornment>
                         }
                       />
                     </FormControl>

                      <FormControl required component="fieldset" className={classes.formControl}>
                       <FormGroup>
                         <FormControlLabel
                           control={<Checkbox checked={state} onChange={checkState} name="update" color="primary"/>}
                           label="I Agree to auto update S.A.M frequently"
                           color="primary"
                         />
                       </FormGroup>
                     </FormControl>
                     <Button variant="outlined">Register</Button>
                     <p className="space" />
                    </center>
                  </div>
                  <Typography variant="h6" className="auth__link" component="p" style={{ fontSize: '18px' }} onClick={() => setUI(false)}>
                    I already have an account
                  </Typography>
                </Paper>
                </Slide>:

                <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <Paper className="auth__paper">
                <Typography variant="h5" className="auth__header--center">Login</Typography>
                <p />
                <Typography variant="h6" className="auth__header--center" component="p">
                  {window.process.env.username}, you would need to login to access your account
                </Typography>
                {/** Registration Form */}
                <div className="auth__registration">
                  <center>
                    <TextField label="Name" variant="filled" className={classes.authFields}/>
                    <FormControl className={classes.authFields} variant="filled">
                     <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                     <FilledInput
                       id="filled-adornment-password"
                       type={values.showPassword ? 'text' : 'password'}
                       value={values.password}
                       onChange={handleChange('password')}
                       endAdornment={
                         <InputAdornment position="end">
                           <IconButton
                             aria-label="toggle password visibility"
                             onClick={handleClickShowPassword}
                             onMouseDown={handleMouseDownPassword}
                             edge="end"
                           >
                             {values.showPassword ? <Visibility /> : <VisibilityOff />}
                           </IconButton>
                         </InputAdornment>
                       }
                     />
                   </FormControl>

                    <FormControl required component="fieldset" className={classes.formControl}>
                     <FormGroup>
                       <FormControlLabel
                         control={<Checkbox checked={state} onChange={checkState} name="update" color="primary"/>}
                         label="Remember Me"
                         color="primary"
                       />
                     </FormGroup>
                   </FormControl>
                   <p />
                   <Button variant="outlined">Login</Button>
                   <p className="space" />
                  </center>
                </div>
                <Typography variant="h6" className="auth__link" component="p" style={{ fontSize: '18px' }} onClick={() => setUI(true)}>
                  Don't have an account
                </Typography>
                </Paper>
                </Slide>
              }
              </Grid>
              <Grid item xs={false} sm={3} />
            </Grid>
        </Grid>
        </Paper>
      </div>
    )
}

export default Authentication;
