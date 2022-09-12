const express = require("express");

const PORT = process.env.PORT || 3333;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
  


// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  // app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });