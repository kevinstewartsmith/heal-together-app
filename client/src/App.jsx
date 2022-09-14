import React, { useState, useEffect } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
// import schoolProblems from "./SchoolProblems";
import {generalSchoolProblems, operationsProblems, supportProblems, curriculumProblems, physicalSafety} from "./SchoolProblems";
import {Card, Typography} from '@mui/material/';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue, blueGrey, red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ContactForm from "./components/ContactForm";
import { display } from "@mui/system";

// function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <Box sx={{ width: '100%', mr: 1 }}>
//           <LinearProgress variant="determinate" {...props} />
//         </Box>
//         <Box sx={{ minWidth: 35 }}>
//           <Typography variant="body2" color="text.secondary">{`${Math.round(
//             props.value,
//           )}%`}</Typography>
//         </Box>
//       </Box>
//     );
//   }


function App() {
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
    const [issues, setIssues] = useState(sections[currentSection])

    useEffect(() => {
        if (currentSection > 0 && currentSection < 6)
        setIssues(sections[currentSection])
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
        console.log(results);
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

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

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
                        <Typography variant="h4" color="text.primary" >{" " + `${Math.round(
                             (currentSection - 1) * 20,
                         )}%`}</Typography>
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
                        <div className="left-arrow"><ArrowBackIosIcon  sx={{ fontSize: 80 }} color="primary"  onClick={leftArrowClicked}/></div>
                            :
                        null
                    }
                        
                    {currentSection < 6 ?
                        <div className="right-arrow"><div className="right-arrow-div"><ArrowForwardIosIcon sx={{ fontSize: 80 }} color="primary" onClick={rightArrowClicked}/></div></div>
                            :
                        null
                    }
                    
                </div>

        </div>
    )    
}

export default App;