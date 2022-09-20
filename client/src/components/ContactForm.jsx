import React from "react";
import {Typography, Card, CardContent, Grid, TextField, Button} from '@mui/material';



function ContactForm() {

    function handleChange() {
        console.log("change!");
    }

    return (
        <div className="contact-form">
            {/* <p className="section-header">Thanks for your input! We want to make public schools better for all student, parents, and staff. YOU can contribute to big and small ways to this movemnt. Please submit the form below.</p> */}
            <Card style={{maxWidth:450, margin:"0 auto", padding:"20px 5px"}}>
                <CardContent>
                <Typography gutterBottom variant="h5" >Submission Form</Typography>
                <Typography gutterBottom color="textSecondary" variant="body2" component="p">Thanks for your input! We want to make public schools better for all student, parents, and staff. YOU can contribute to big and small ways to this movement. Please submit the form below.</Typography>
                <form>
                    <Grid container spacing={1}>
                        <Grid  xs={12} small={6} item>
                            <TextField onChange={handleChange} label="First Name" placeholder="Enter first name" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid  xs={12} small={6} item>
                            <TextField label="Last Name" placeholder="Enter last name" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField type="email" label="Email" placeholder="Enter email" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField type="number" label="Phone" placeholder="Enter phone number" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField  label="Message" multiline rows={4} placeholder="If you have any questions, you can send us a message!" variant="outlined" fullWidth />
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