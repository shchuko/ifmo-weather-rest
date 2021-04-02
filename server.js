const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const db = require("./db/config");
const config = require("./config");

const app = express();
const port = config.port;

app.use(cors());

mongoose.set("useCreateIndex", true);

mongoose.connect(db.url, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
    .then((mongoose) => {
        require("./app/routes")(app, mongoose);

        app.listen(port, () => {
            console.log("The sever is started...");
        });
    })
    .catch(console.log);
