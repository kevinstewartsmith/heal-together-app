import React, { useState, useRef } from "react";
import {Typography, Card, CardContent, Grid, TextField, Button} from '@mui/material';
import {generalSchoolProblems, operationsProblems, supportProblems, curriculumProblems, physicalSafety} from "../SchoolProblems";
import ThankYouDialog from "./ThankYouDialog";
import reCAPTCHA from "react-google-recaptcha"

function ContactForm(props) {
    // eslint-disable-next-line 
    const [thankYouDialogOpened, setThankYouDialogOpened] = useState(false)
    const captchaRef = useRef(null)
    
   // let clickCounter = 0
    // function upTheClickCounter() {
    //    clickCounter++
    // }
    //function thankYou() { setThankYouDialogOpened(!thankYouDialogOpened) }
    //useEffect(() => {setThankYouDialogOpened(!thankYouDialogOpened)}, [clickCounter])

    const section1 = window.localStorage.getItem("SECTION_1") !== null ? window.localStorage.getItem("SECTION_1") : JSON.stringify(generalSchoolProblems.problems);
    const section2 = window.localStorage.getItem("SECTION_2") !== null ? window.localStorage.getItem("SECTION_2") : JSON.stringify(operationsProblems.problems);
    const section3 = window.localStorage.getItem("SECTION_3") !== null ? window.localStorage.getItem("SECTION_3") : JSON.stringify(supportProblems.problems);
    const section4 = window.localStorage.getItem("SECTION_4") !== null ? window.localStorage.getItem("SECTION_4") : JSON.stringify(curriculumProblems.problems);
    const section5 = window.localStorage.getItem("SECTION_5") !== null ? window.localStorage.getItem("SECTION_5") : JSON.stringify(physicalSafety.problems);
   // console.log("section1 bruh");
   // console.log(section1);
   console.log("Local storage type");
   console.log(typeof(window.localStorage.getItem("SECTION_1") ));
   console.log("native data");
   console.log(typeof(generalSchoolProblems.problems));
   console.log(generalSchoolProblems.problems);

    function submitClicked(event) {
       
        //console.log(section1);
        event.preventDefault()
        const token = captchaRef.current.getValue();
        captchaRef.current.reset()
        console.log(token);
        const elementsArray = event.target.elements
        // console.log(elementsArray[0].value);
        // console.log(elementsArray[2].value);
        // console.log(elementsArray[4].value);
        // console.log(elementsArray[6].value);
        // console.log(elementsArray[8].value);
        const date = new Date();
        // console.log(
        //     date.toLocaleString('en-US', {
        //       timeZone: 'America/New_York',
        //     }),
        //   );
        const dateTime = date.toLocaleString('en-US', { timeZone: 'America/New_York'})
        const surveyData = {
            "dateTime" : dateTime,
            "firstName" : elementsArray[0].value,
            "lastName" :  elementsArray[2].value,
            "email" : elementsArray[4].value,
            "phone" : elementsArray[6].value,
            "zipCode" : elementsArray[8].value,
            "message" : elementsArray[10].value,
            "answers": {
                "section1": section1,
                "section2": section2,
                "section3": section3,
                "section4": section4,
                "section5": section5 
            }
        }

        fetch('/addSurveyResults', {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(surveyData),
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
    
          }).then(function(response) {
            console.log("First Callback");
            console.log(response )
            return response.json();
          }).then(function(response){ console.log(response) });
        
        //console.log(surveyData);
        window.localStorage.clear();
       // submitClicked()
       //setThankYouDialogOpened(!thankYouDialogOpened)
       //upTheClickCounter()
       //thankYou()
       props.submitButtonClicked() 
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
                            <TextField name="zipCode"  type="number" label="Zip Code" placeholder="Enter zip code" variant="outlined" fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField  name="message"  label="Message" multiline rows={4} placeholder="If you have any questions, you can send us a message!" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={12} item>
                            <reCAPTCHA sitekey={process.env.RECAPTCHA_SITE_KEY} ref={captchaRef} /><h1>hh{process.env.RECAPTCHA_SITE_KEY}</h1>
                        </Grid>
                        <Grid xs={12} item>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
                </CardContent>
                
            </Card>

            {thankYouDialogOpened  ? <ThankYouDialog submitted={thankYouDialogOpened} submitButtonClicked={props.submitButtonClicked} /> : null}
        </div>
    );
}

export default ContactForm