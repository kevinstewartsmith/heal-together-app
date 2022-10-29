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






export default function LanguageMode(props) {
    const [engSelected, setEngSelected] = useState(true);
    
    let engCSS = {
        textDecoration: engSelected ? 'underline' : 'none', 
        display: 'inline',
        color:  '#af8bf8',
        fontSize: engSelected ? '2.0rem':'1.5rem'
        
    }
    let espCSS = {
        textDecoration: !engSelected ? 'underline' : 'none',
        display: 'inline',
        color:  '#af8bf8',
        fontSize: engSelected ? '1.5rem':'2.0rem'
    }

    
    function changeLanguage(event) {
        const { name, value, id } = event.target;
        console.log("Button tapped: " + id);
        if (id === "esp" && engSelected) {
            setEngSelected(!engSelected)
        } else if (id === "eng" && !engSelected){
            setEngSelected(!engSelected)
        }

        props.switchLanguage()
    }

    return (
        <div className="language-mode" >
            <div style={{ display: 'inline'}} ><h5 id="eng" style={engCSS} onClick={changeLanguage} >ENG</h5></div>
            <div  style={{display: 'inline'}} ><h5 style={{display: 'inline'}} > | </h5></div>
            <div style={{ display: 'inline'}}><h5 id="esp" style={espCSS} onClick={changeLanguage} >ESP</h5></div>
        </div>  
    )
}