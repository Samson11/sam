import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './install.scss';

const Installer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [snack, setSnack] = useState({
   openSnack: false,
   vertical: 'bottom',
   horizontal: 'center',
   });

   const { vertical, horizontal, openSnack } = snack;

   const snackbar = (newState) => () => {
     setSnack({ openSnack: true, ...newState });
   };

   const closeSnackbar = () => {
     setSnack({ ...snack, openSnack: false });
   };

   setTimeout(() => setOpen(true), 1);

   const handleClose = () => {
      setOpen(false);
   };

   return (
     <div>
       <Dialog
         fullScreen={fullScreen}
         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
       >
         <DialogTitle id="responsive-dialog-title">{"Terms and Conditions"}</DialogTitle>
         <DialogContent>
           <DialogContentText>
           By clicking on Agree, you thereby accept all the terms and conditions provided by Amber Inc.
           Review them at https://amberinc.web.app/terms before proceeding into installation.
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={snackbar({ vertical: 'bottom', horizontal: 'center' })} color="primary">
             Disagree
           </Button>
           <Button onClick={handleClose} color="primary" component={Link} to="/about">
             Agree
           </Button>
         </DialogActions>
       </Dialog>

       <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        onClose={closeSnackbar}
        message="You need to accept the terms to install"
        key={vertical + horizontal}
      />
     </div>
   );
}

export default Installer;
