const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const authroute = require('./server/routes/authroute');
const cookieParser= require ('cookie-parser')

require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
//connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))
app.use(bodyparser.json())
app.use(cookieParser())

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))

// load routers
//app.use('/', require('home'))

app.use("/",require('./server/routes/router'));
app.use("/",authroute);

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});