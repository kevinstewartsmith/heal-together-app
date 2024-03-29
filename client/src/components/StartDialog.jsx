import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LanguageMode from './LanguageMode';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function StartDialog(props) {
  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
          
          <Typography sx={{ fontFamily: 'Paytone One' , color: "#af8bf8", fontSize: "1.5rem" }}>{ props.engSelected ? "Welcome to the Back2School Quick Survey!" : "Bienvenidx a la encuesta rápida de Back2School (regreso a la escuela)" }</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers >
          <Typography gutterBottom sx={{ color: "#A6A9B6", fontFamily: 'Paytone One' }} >
            Language/Idioma: <LanguageMode switchLanguage={props.switchLanguage} engSelected={props.engSelected} position={"language-mode-start"} /> 
          </Typography>
          <Typography gutterBottom sx={{ color: "#A6A9B6", fontFamily: 'Paytone One' }}>
            {props.engSelected ? "Thanks for taking time to fill out the Back2School quick survey. We'll make this quick!" : "Gracias por tomarse el tiempo de completar la encuesta de Back2School. ¡Esto va a ser rápido!"} 
          </Typography>
          <Typography gutterBottom sx={{color: "#A6A9B6",fontFamily: 'Paytone One' }}>
          {props.engSelected ? "Simply drag and drop the school issues in order of importance. Most important issues go on the top. Least important go on the bottom." : "Simplemente arrastra las cajas con los asuntos escolares en orden de importancia. Los más importantes van encima y los menos importantes hacia abajo."}
          </Typography>
          <Typography gutterBottom>
            
          </Typography>
 
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          <Typography sx={{ fontFamily: 'Paytone One' , color: "#af8bf8", fontSize: "1.5rem" }}>{props.engSelected ? "Let's Do This!" : "¡Vamos!" }</Typography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}