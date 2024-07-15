//Basic express syntax
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.urlencoded({
    extended: true
}))

let global_db = {}; //Creating a mini database to store all the tasks
let taskNum;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
    res.json(global_db);
})

app.post('/write', (req, res) => {
    taskNum = Object.keys(global_db).length + 1;
    const formData = req.body;
    global_db[taskNum] = formData;
    console.log("The database now after adding task " + taskNum + ":-");
    console.log(global_db);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Started listening on port: ${port}`);
})