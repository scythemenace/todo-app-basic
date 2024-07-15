const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.urlencoded({
    extended: true
}))