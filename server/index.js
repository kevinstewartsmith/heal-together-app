const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
const _ = require("lodash")
const mongoose = require("mongoose")
const axios = require('axios');
const { Router } = require("express");
const router = express.Router()
//import password as password from "./pw"
//const password = require("./pw")

const PORT = process.env.PORT || 3333;

const app = express();

//Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
//console.log(password.getPassword());
//const pw = password.getPassword()
//const URL = password.getConnect()
//const connect = URL
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('connected')).catch(e=>console.log(e));
//mongoose.connect(URL).then(()=>console.log('connected')).catch(e=>console.log(e));

//?retryWrites=true&w=majority")
const apiKey = process.env.API_KEY

const surveyResponses = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
  answers: {
    section1: {
      "title": "General School Problems",
      "problems": [
        {
          id: "0",
          issue: "Class sizes are too large."
        },
      ]
    },
    section2: {},
    section3: {},
    section4: {},
    section5: {}
  }
}
//DATABASE START
const languageSchema = mongoose.Schema({
  eng: {
    type: String,
    required: true
  },
  esp: {
    type: String,
    required: true
  }
});

const problemSchema = mongoose.Schema({
  id_num: {
    type: String,
    required: true
  },
  issue: {
    type: languageSchema,
    required: true
  }
});

const answerSchema = mongoose.Schema({
  section1: {
    type: [problemSchema],
    required: true
  },
  section2: {
    type: [problemSchema],
    required: true
  },
  section3:{
    type: [problemSchema],
    required: true
  },
  section4:{
    type: [problemSchema],
    required: true
  },
  section5: {
    type: [problemSchema],
    required: true
  }
})

const responseSchema = mongoose.Schema({
  date_time: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  zip_code: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  answers: {
    type: answerSchema,
    required: false
  }
})

const Language = mongoose.model("language", languageSchema);
const Problem = mongoose.model("problem", problemSchema);
//const Section = mongoose.model("section", sectionSchema);
const Answers = mongoose.model("answer", answerSchema);
const Responses = mongoose.model("response", responseSchema);
//DATABASE END

//SCHEMAS
// issues
// sections
// answers
// responses



// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// app.get('/results', (req, res) => {
//   let data = []
//   Responses.find({},function(err,foundResponses) {
//     if (err) {
//       console.log(err);
//     } else {
//       data = foundResponses
//       //res.send(data)
//       //res.json({ message: "Hello from server!" });
//       res.json(data)
//     }
//   }) 
  
  
// });

app.get('/results/:api', (req, res) => {
  let data = []
  const apiParam = req.params.api
  if (apiParam === apiKey) {
    Responses.find({},function(err,foundResponses) {
      if (err) {
        console.log(err);
      } else {
        data = foundResponses
        //res.send(data)
        //res.json({ message: "Hello from server!" });
        res.json(data)
      }
    }) 
} else {
  res.json({"message": "nope!"})
}
  
  
});

app.post("/addSurveyResults", (req, res) => {
  //const {token} = req.body;
  const data = req.body.surveyData
  const dateTime = data.dateTime
  const firstName = data.firstName
  const lastName = data.lastName
  const email = data.email
  const phone = data.phone
  const zipCode = data.zipCode
  const message = data.message
  const answers = data.answers
  const section1 = JSON.parse(data.answers.section1)
  const section2 = JSON.parse(data.answers.section2)
  const section3 = JSON.parse(data.answers.section3)
  const section4 = JSON.parse(data.answers.section4)
  const section5 = JSON.parse(data.answers.section5)
  const sectionsArr = [section1,section2,section3,section4,section5]
  
  
  //Responses.find({email: email})
  Responses.find({email: email}, function(err,foundResults) {
    if (err) {
      console.log(err);
    } else {
      if (foundResults.length > 0) {
        res.json({
          status: "Survey Results have aleady been added from this email address!",
          dataDidSubmit: false
        })
      } else {
        //START Add Results to database
      let array = []
      //console.log(sectionsArr[0][0].issue)
      let issueArray = []

      //Add results to an array
        for (let j = 0; j < sectionsArr.length; j++) {
          
          for (let i = 0; i < sectionsArr[j].length; i++) {
            console.log(sectionsArr[i])
            const issueLanguages = new Language({
              eng: sectionsArr[j][i].issue.eng,
              esp: sectionsArr[j][i].issue.esp
            })
            issueLanguages.save()
            const newProblem = new Problem({
              id_num: sectionsArr[j][i].id,
              issue: issueLanguages
              //issue: sectionsArr[j][i].issue
              
            })
      
            newProblem.save()  
            issueArray.push(newProblem)
          }
          array.push(issueArray)
          issueArray = []
        }
        console.log("Bruh2");
        console.log(array);

        const newAnswer = new Answers({
          section1: array[0],
          section2: array[1],
          section3: array[2],
          section4: array[3],
          section5: array[4]  
        })

        newAnswer.save()

        const newResponse = new Responses({
          date_time: dateTime,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          zip_code: zipCode,
          message: message,
          answers: newAnswer
        })

        newResponse.save()

        res.json({
          status: "Successfully Addes Survey Data",
          dataDidSubmit: true
        })
      //ADD RESULTS TO DATABASE END
      }
    }
  }) 
  

  

})

app.post("/postRecaptcha", async (req,res) => {
  const {token} = req.body;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );

  const key = process.env.RECAPTCHA_SECRET_KEY
  if (res.status(200)) {
    res.json({isHuman: response.data.success})
  } else {
    res.json({isHuman: response.data.success})
  }


})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// app.listen(process.env.PORT || 3333, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });

