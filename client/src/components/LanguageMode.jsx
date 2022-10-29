import React, { useState,  useEffect } from "react";
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
import { positions } from '@mui/system';


const [engSelected, setEngSelected] = useState(false);



export default function LanguageMode() {
    return (
        <div className="language-mode">
            <div><h5 style={{textDecoration: 'underline', display: 'inline'}} onClick={ console.log("eng clicked")} >ENG</h5></div>
            <div><h5 style={{display: 'inline'}} >|</h5></div>
            <div><h5 style={{display: 'inline' }} onClick={ console.log("esp clicked")} >ESP</h5></div>
        </div>  
    )
}