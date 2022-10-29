
import React, { useState,  useEffect } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import {generalSchoolProblems, operationsProblems, supportProblems, curriculumProblems, physicalSafety} from "./SchoolProblems";
import {Card, Typography, CardHeader, Avatar, Box, LinearProgress} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
//import { blue } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Fab from "@mui/material/Fab";
import ContactForm from "./components/ContactForm";
import StartDialog from "./components/StartDialog";
import { v4 as uuidv4 } from 'uuid';
import CountUp from 'react-countup';
import healHeader from './heal-header.png';
import LanguageMode from "./components/LanguageMode";
//import { color } from "@mui/system";


function App() {
    const [engSelected, setEngSelected] = useState(true);
    console.log(window.innerWidth)
    const windowWidth = window.innerWidth

    const mobileSizes = {
        header: "1.5rem"
    }
    const desktopSizes = {
        header: null
    }
    // eslint-disable-next-line
    const sizes = windowWidth > 720 ?  desktopSizes :  mobileSizes
    

    
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
        console.log("changed");
        window.localStorage.setItem("SECTION_" + currentSection, JSON.stringify(results[currentSection]))

        const changedSection = "SECTION_" + currentSection.toString() + "_CHANGED";
        console.log(changedSection);
        const localChanged = window.localStorage.getItem(changedSection)
        console.log("local changed: " + localChanged);
        if ( localChanged === "false") {
            
        }

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

    function submitButtonClicked() {
        setCurrentSection(7)
    }

    function switchLanguage() {
        console.log("switch");
        setEngSelected(!engSelected)
    }

    const [progress, setProgress] = useState(0);

    return (
        <div>
            <header>
                {/* <h1 style={{ fontSize: sizes.header }} >Back <p style={{color:"red", display:"inline", fontSize: sizes.header }}>2</p> School Quick Survey</h1> */}
               <div style={{backgroundColor: "clear", display: "flex", justifyContent: "center"}}> <img src={healHeader} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '30%'}} alt="Logo" /></div>
               {/* <div className="language-mode">ENG | ESP</div>   */}
               <LanguageMode switchLanguage={switchLanguage} /> 
                {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Image
                        source={healHeader}
                        resizeMode="contain"
                        style={{ width: 98 }}
                    />
                </View> */}
            </header>
                <div className="choices">
               
                { currentSection !== 7 ?
                    <div className="progress-container">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress sx={{"& .MuiLinearProgress-bar": { backgroundColor: "#7b9ee4" },color: "#bfa3f7"}}  variant="determinate" value={progress} />
                            </Box>
                            <Box sx={{ minWidth: 35, p: 1 }}>
                            <Typography variant="h5" color="text.primary" sx={{ color: "#bfa3f7", fontFamily: 'Paytone One' }} >
                            {/* "#26BAEE" */}
                                <CountUp
                                    suffix="%" 
                                    duration={0.25} 
                                    end={Math.round(
                                    (currentSection - 1) * 20,
                                )} />
                            </Typography>

                            </Box>
                        </Box>
                    </div> : null }
                    
                    {currentSection < 6 && currentSection !== 7 ? 
                        <h2  className="section-header"> {engSelected ? ("Section" + currentSection + ": " + sectionTitles[currentSection].eng) : ("Sección" + + currentSection + ": " + sectionTitles[currentSection].esp)}</h2>
                            :
                        <div style={{backgroundColor: "clear", display: "flex", justifyContent: "center"}}><h2  className="section-header" style={{fontSize: "2.5em"}}>FINISHED!</h2></div>
                    }
                    {currentSection === 7 ?
                        <Typography variant="h5" color="text.primary" sx={{ color: "#A6A9B6", fontFamily: 'Paytone One' }} >Thanks again for your input! There are plenty of ways you can support NC public schools. Someone will be in touch with you soon. You may close this window.</Typography> : null
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
                                                                        <Avatar sx={{ bgcolor: "#7b9ee4" }} aria-label="recipe">
                                                                                <div className="number-box"><h1>{index + 1 + " "}</h1></div>
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
                            : currentSection !== 7 ? <ContactForm submitButtonClicked={submitButtonClicked} /> : null}
                    
                    {currentSection > 1 && currentSection !== 7 ?
                        <div className="left-arrow"><div className="left-arrow-div"><Fab color="primary"  sx={{ backgroundColor:"#7b9ee4", width: 80, height: 80}} onClick={leftArrowClicked}><ArrowBackIosIcon sx={{ marginLeft: 4, fontSize: 80, color:"white"}} color="primary" onClick={rightArrowClicked}/></Fab></div></div>
                            :
                        null
                    }
                        
                    {currentSection < 6 ?
                        <div className="right-arrow"><div className="right-arrow-div"><Fab onKeyPress={console.log("Right arrow pressed")} color="primary" sx={{ backgroundColor:"#7b9ee4", width: 80, height: 80 }}><ArrowForwardIosIcon sx={{ marginLeft: 1, fontSize: 80, color: "white" }} color="primary" onClick={rightArrowClicked}/></Fab></div></div>
                            :
                        null
                    }

                    
                </div>

                <StartDialog  />
                

        </div>
    )    
}

export default App;