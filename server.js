const express = require("express");
const bodyParser = require("body-parser");
const db = require("db/config");
const mongoose = require("mongoose");


const app = express();
const port = 8076;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(db.url, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
    .then((mongoose) => {
        require("app/routes")(app, mongoose);

        app.listen(port, () => {
            console.log("The sever is started...");
        });
    })
    .catch(console.log);
