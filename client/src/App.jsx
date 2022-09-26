
import React, { useState,  useEffect } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
// import schoolProblems from "./SchoolProblems";
import {generalSchoolProblems, operationsProblems, supportProblems, curriculumProblems, physicalSafety} from "./SchoolProblems";
import {Card, Typography, CardHeader, Avatar, Box, LinearProgress} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Fab from "@mui/material/Fab";
import ContactForm from "./components/ContactForm";
import StartDialog from "./components/StartDialog";
import { v4 as uuidv4 } from 'uuid';
//import { json } from "express";
import CountUp from 'react-countup';




function App() {
//MODAL START


//MODAL END


    console.log(window.innerWidth)
    const newID = uuidv4()
    // eslint-disable-next-line
    const [id, setId] = useState(newID);
    
    useEffect(() => {
        if (localStorage.getItem("SURVEY_USER_ID") === null) {
            window.localStorage.setItem("SURVEY_USER_ID", JSON.stringify(id))
          }
    }, [id]);

    const results = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
    }

    const [currentSection, setCurrentSection] = useState(1)
    
    const sectionTitles = {
        1: generalSchoolProblems.title,
        2: operationsProblems.title,
        3: supportProblems.title,
        4: curriculumProblems.title,
        5: physicalSafety.title
    }
    const sections = { 
        1: generalSchoolProblems.problems,
        2: operationsProblems.problems,
        3: supportProblems.problems,
        4: curriculumProblems.problems,
        5: physicalSafety.problems 
    }

    const localStorageIssues = window.localStorage.getItem("SECTION_" + currentSection ) 
    const localStorageIssuesJSON = JSON.parse(localStorageIssues) 
    

    const initialIssues = localStorageIssues === null ?  sections[currentSection] : localStorageIssuesJSON
    console.log("issues");
    console.log(initialIssues);
    console.log("current section")
    console.log(sections[currentSection]);
    const [issues, setIssues] = useState(initialIssues)

    useEffect(() => {
        if (currentSection > 0 && currentSection < 6)
        setIssues(initialIssues)
    },[currentSection]); 

    function handleOnDragEnd(result) {
        if (!result.destination) return 
        //console.log(result);
        const items = Array.from(issues)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setIssues(items)
        results[currentSection] = items

        //console.log(items);
        //window.localStorage.setItem("SECTION_" + currentSection, results[currentSection][0].issue)
        //const wawa = window.localStorage.getItem("SECTION_" + currentSection)
        //console.log("i" + wawa[0]);

        //console.log(results[1][0]);
        console.log("changed");
        window.localStorage.setItem("SECTION_" + currentSection, JSON.stringify(results[currentSection]))

        const changedSection = "SECTION_" + currentSection.toString() + "_CHANGED";
        console.log(changedSection);
        const localChanged = window.localStorage.getItem(changedSection)
        console.log("local changed: " + localChanged);
        if ( localChanged === "false") {
            
        }
        //window.localStorage.setItem("fart", "done")
        //window.localStorage.setItem("SECTION_1_CHANGED", "rrr")
        window.localStorage.setItem(changedSection, JSON.stringify("true"))
    }

    function rightArrowClicked() {
        if (currentSection > 0 && currentSection < 6) { 
            setCurrentSection(currentSection + 1)
            setProgress(progress + 20)
        }
        console.log(currentSection);
    }
    function leftArrowClicked() {
        if (currentSection > 0 && currentSection < 7) { 
            setCurrentSection(currentSection - 1)
            setProgress(progress - 20)
        }
    }

    //const [expanded, setExpanded] = useState(false);
    const [progress, setProgress] = useState(0);

    return (
        <div>
            <header>
                <h1>Back <p style={{color:"red", display:"inline"}}>2</p> School Quick Survey</h1>
            </header>
                <div className="choices">
                    <div className="progress-container">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box sx={{ minWidth: 35, p: 1 }}>
                        <Typography variant="h5" color="text.primary" sx={{ color: "#26BAEE", fontFamily: 'Paytone One' }} >
                            <CountUp
                                suffix="%" 
                                duration={0.25} 
                                end={Math.round(
                                (currentSection - 1) * 20,
                            )} />
                         </Typography>

                         </Box>
                    </Box>
                    </div>
                    {currentSection < 6 ? 
                        <h2  className="section-header">Section {currentSection + ": " + sectionTitles[currentSection]}</h2>
                            :
                        <h2  className="section-header">FINISHED!</h2>
                    }
                    {currentSection > 0 && currentSection < 6 ?  
                            <DragDropContext onDragEnd={handleOnDragEnd} >
                                <Droppable droppableId="issues">
                                    
                                        {(provided) => (
                                            <ul className="issues" {...provided.droppableProps} ref={provided.innerRef}>
                                                {issues.map(({id, issue}, index) => {
                                                    return (
                                                        
                                                        <Draggable key={id} draggableId={id} index={index}>
                                                            {(provided) => (
                                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                {/* <div className="number-box"><h1>{index + 1+ " "}</h1></div> */}
                                                                {/* <p>
                                                                    { issue }
                                                                
                                                                </p> */}
                                                                <Card sx={{ width: 1.0 }}>
                                                                    <CardHeader
                                                                        avatar={
                                                                        <Avatar sx={{ bgcolor: blue[50] }} aria-label="recipe">
                                                                                <div className="number-box"><h1>{index + 1+ " "}</h1></div>
                                                                        </Avatar>
                                                                    }
                                                                    action={
                                                                        <IconButton aria-label="settings">
                                                                            {/* <FavoriteIcon /> */}
                                                                        </IconButton>
                                                                    }
                                                                    title={<h3>{ issue }</h3>}
                                                                    
                                                                />

                                                                </Card>
                                                            </li>
                                                            )}

                                                        </Draggable> 
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                
                                </Droppable>
                            </DragDropContext>
                            :<ContactForm />}
                    
                    {currentSection > 1 ?
                        <div className="left-arrow"><div className="left-arrow-div"><Fab color="primary" sx={{  width: 80, height: 80 }} onClick={leftArrowClicked}><ArrowBackIosIcon sx={{ marginLeft: 4, fontSize: 80, color:"white"}} color="primary" onClick={rightArrowClicked}/></Fab></div></div>
                            :
                        null
                    }
                        
                    {currentSection < 6 ?
                        <div className="right-arrow"><div className="right-arrow-div"><Fab onKeyPress={console.log("Right arrow pressed")} color="primary" sx={{  width: 80, height: 80 }}><ArrowForwardIosIcon sx={{ marginLeft: 1, fontSize: 80, color: "white" }} color="primary" onClick={rightArrowClicked}/></Fab></div></div>
                            :
                        null
                    }

                    
                </div>

                <StartDialog />

        </div>
    )    
}

export default App;