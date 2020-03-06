const express = require('express');
const path = require('path');
// const handlebars = require('express-handlebars');
const loggers = require('./middleware/loggers');
const app = express();
const cors = require('cors');

const tickets = require('./routes/api/ticket/tickets');
const articles = require('./routes/api/article/articles');
const categories = require('./routes/api/category/categories');
const sections = require('./routes/api/section/sections');
const segments = require('./routes/api/segment/segment.route');
const organizations = require('./routes/api/organization/organizations');
const users = require('./routes/api/user/users');
const tags = require('./routes/api/tag/tags');
const PORT = process.env.PORT  || 5000;


app.use(cors());

//middlewares
app.use(loggers.requestLogger);

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//static files
app.use(express.static(path.join(__dirname,"public/help-center-app")));

//API: routes
app.use('/api/tickets/',tickets);            // routes for ticket APIs
app.use('/api/articles/', articles);        // routes for article APIs
app.use('/api/categories/', categories);    // routes for category APIs
app.use('/api/sections/', sections);         // routes for sections APIs
app.use('/api/segments/', segments);         // routes for user segment APIs
app.use('/api/organizations/', organizations) // routes for organizations APIs
app.use('/api/users/', users) //routes for User Apis
app.use('/api/tags/', tags) // routes for tagss APIs


//get home path -  rendered
app.get('/*', (req, res) =>{
    // client.connect()
    res.sendFile(path.join(__dirname, 'public/help-center-app/index.html'));
})

app.listen(PORT, () => {console.log('Server Started on port :'+PORT) })

//get home path -  static
// app.get('/', (req, res) =>{
//     res.sendFile(__dirname, 'public', 'index.html')
// })

