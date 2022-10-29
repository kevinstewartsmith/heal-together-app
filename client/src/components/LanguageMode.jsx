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






export default function LanguageMode() {

    const [engSelected, setEngSelected] = useState(false);
    function changeLanguage(event) {
        const { name, value, id } = event.target;
        console.log("Button tapped: " + id);
    }

    return (
        <div className="language-mode" >
            <div style={{ display: 'inline'}} ><h5 id="eng" style={{textDecoration: 'underline', display: 'inline'}} onClick={changeLanguage} >ENG</h5></div>
            <div  style={{display: 'inline'}} ><h5 style={{display: 'inline'}} > | </h5></div>
            <div style={{ display: 'inline'}}><h5 id="esp" style={{display: 'inline' }} onClick={changeLanguage} >ESP</h5></div>
        </div>  
    )
}