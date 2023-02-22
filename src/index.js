const express = require("express");
require('./db/mongoose')
const User = require('./models/user')
const router = require('./routers/router')

const app = express();
app.use(express.json());
app.use(router);


app.listen('3000', () => {
    console.log("server is up on port 3000 !")
})





