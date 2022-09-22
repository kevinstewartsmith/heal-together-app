import React, { useState,useEffect } from "react";
import {Typography, Card, CardContent, Grid, TextField, Button} from '@mui/material';



function ContactForm() {

    function submitClicked(event) {
        event.preventDefault()
        const elementsArray = event.target.elements
        // console.log(elementsArray[0].value);
        // console.log(elementsArray[2].value);
        // console.log(elementsArray[4].value);
        // console.log(elementsArray[6].value);
        // console.log(elementsArray[8].value);

        const surveyData = {
            firstName : elementsArray[0].value,
            lastName :  elementsArray[2].value,
            email : elementsArray[4].value,
            phone : elementsArray[6].value,
            message : elementsArray[8].value,
            answers: {
                section1: window.localStorage.getItem("SECTION_1"),
                section2: window.localStorage.getItem("SECTION_2"),
                section3: window.localStorage.getItem("SECTION_3"),
                section4: window.localStorage.getItem("SECTION_4"),
                section5: window.localStorage.getItem("SECTION_5")
            }
        }
        
        console.log(surveyData);
        
        
    }

    return (
        <div className="contact-form">
            {/* <p className="section-header">Thanks for your input! We want to make public schools better for all student, parents, and staff. YOU can contribute to big and small ways to this movemnt. Please submit the form below.</p> */}
            <Card style={{maxWidth:450, margin:"0 auto", padding:"20px 5px"}}>
                <CardContent>
                <Typography gutterBottom variant="h5" >Submission Form</Typography>
                <Typography gutterBottom color="textSecondary" variant="body2" component="p">Thanks for your input! We want to make public schools better for all student, parents, and staff. YOU can contribute to big and small ways to this movement. Please submit the form below.</Typography>
                <form onSubmit={submitClicked}>
                    <Grid container spacing={1}>
                        <Grid  xs={12} small={6} item>
                            <TextField name="fName"  label="First Name" placeholder="Enter first name" variant="outlined"  fullWidth required/>
                        </Grid>
                        <Grid  xs={12} small={6} item>
                            <TextField name="lName"  label="Last Name" placeholder="Enter last name" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField name="email"  type="email" label="Email" placeholder="Enter email" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField name="phone"  type="number" label="Phone" placeholder="Enter phone number" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField  name="message"  label="Message" multiline rows={4} placeholder="If you have any questions, you can send us a message!" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={12} item>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
                </CardContent>
                
            </Card>
        </div>
    );
}

export default ContactForm