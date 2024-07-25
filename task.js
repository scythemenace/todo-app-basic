//Basic express syntax
const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('store.txt', 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

readFile().then(val => {
  let deciding_db = {}; //Creating a mini database to store all the tasks
  if (val != "") {
    deciding_db = JSON.parse(val);
  }
  return deciding_db
}).then(decided_db => {
  let global_db = decided_db;
  let taskNum;

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/data", (req, res) => {
    res.json(global_db);
  });

  app.post("/write", (req, res) => {
    taskNum = Object.keys(global_db).length + 1;
    const formData = req.body;
    global_db[taskNum] = formData;
    //console.log("The database now after adding task " + taskNum + ":-");
    //console.log(global_db);
    const string_db = JSON.stringify(global_db);
    fs.writeFile('store.txt', string_db, 'utf-8', () => {
      console.log("data written successfully");
    })
    res.redirect("/");
  });

  app.listen(port, () => {
    console.log(`Started listening on port: ${port}`);
  });

})
