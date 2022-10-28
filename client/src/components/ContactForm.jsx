import React, { useState, useRef } from "react";
import {Typography, Card, CardContent, Grid, TextField, Button} from '@mui/material';
import {generalSchoolProblems, operationsProblems, supportProblems, curriculumProblems, physicalSafety} from "../SchoolProblems";
import ThankYouDialog from "./ThankYouDialog";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

require('dotenv').config()
//onst reCAPTCHA = require("react-google-recaptcha")
var isValidZip = require('is-valid-zip');

function ContactForm(props) {
    // eslint-disable-next-line 
    const [thankYouDialogOpened, setThankYouDialogOpened] = useState(false)
    const captchaRef = useRef(null)
    console.log(process.env.RECAPTCHA_SITE_KEY)
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

    async function submitClicked(event) {
       
        //console.log(section1);
        event.preventDefault()

        const token = captchaRef.current.getValue();
        captchaRef.current.reset()
        console.log(token);
        let theUser = "";

        await axios.post("/postRecaptcha", {token})
        .then(res =>  theUser = res.data)
        .catch((error) => {
        console.log(error);
        })
        console.log("User is a ");
        console.log(theUser);
        console.log(theUser.isHuman === true);
        console.log(theUser);
        //theUser.isHuman = false
        if (theUser.isHuman === true) {
            const elementsArray = event.target.elements
            let dataDidSubmit = {}
            const date = new Date();

            const dateTime = date.toLocaleString('en-US', { timeZone: 'America/New_York'})
            if (isValidZip (elementsArray[8].value)) {

            } else {
                alert("Please enter a valid zip code.")
            }

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

            const resultsAdded = fetch('/addSurveyResults', {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(surveyData),
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
        
            }).then(function(response) {
                console.log("First Callback");
                console.log(response )
                return response.json();
            }).then(function(response){ 
                return response
            }).catch((error) => {
                console.log(error);
            });
            
            // .then(function(response){ 
            //     console.log(response) 
            //     dataDidSubmit = response
            // })
            // .catch((error) => {
            //     console.log(error);
            // });
            console.log("Data did submit");
            console.log(resultsAdded);
            
            
            // .then( function(res) {
            //     return res.json()
            // }).then(res =>  dataDidSubmit = res.dataDidSubmit).catch((error) => {
            //     console.log(error);
            // })
            // console.log("data:");
            // console.log(dataDidSubmit);
            
            
            if (dataDidSubmit.dataDidSubmit === true ) {
                console.log("Data did submit:" + dataDidSubmit);
                goToFinishPage()
            } else {
                alert("Survey Results have aleady been added from this email address!")
            }
            
        } else {
            console.log("Please redo the recaptcha")
            alert("Please complete the reCAPTCHA to prove you are not a robot.")
        }

    }

    function goToFinishPage() {
        window.localStorage.clear();
        props.submitButtonClicked(); 
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
                            <TextField name="zipCode"  type="number" label="Zip Code (XXXXX or XXXXX-XXXX)" placeholder="Enter zip code" variant="outlined" fullWidth required />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField  name="message"  label="Message" multiline rows={4} placeholder="If you have any questions, you can send us a message!" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={12} item>
                            <ReCAPTCHA sitekey="6LdUfakiAAAAAPqnz4Oqjb-Q2cztmD98RUq_NBIG" ref={captchaRef} />
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