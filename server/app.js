const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const loggers = require('./middleware/loggers');
const app = express();
const cors = require('cors');

const tickets = require('./routes/api/ticket/tickets');
const articles = require('./routes/api/article/articles');
const categories = require('./routes/api/category/categories');
const sections = require('./routes/api/section/sections');

const PORT = process.env.PORT  || 5000;


app.use(cors());

//middlewares
app.use(loggers.requestLogger);

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//static files
app.use(express.static(path.join(__dirname,"assets/files/article_data")));
app.use(express.static(path.join(__dirname,"public")));

// Handlebars Middleware
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');


//get home path -  rendered
app.get('/', (req, res) =>{
    // client.connect()
    res.render('index');
})



//get home path -  static
// app.get('/', (req, res) =>{
//     res.sendFile(__dirname, 'public', 'index.html')
// })

//API: routes
app.use('/api/ticket/',tickets);            // routes for ticket APIs
app.use('/api/articles/', articles);        // routes for article APIs
app.use('/api/categories/', categories);    // routes for category APIs
app.use('/api/sections/', sections);         // routes for sections APIs

app.listen(PORT, () => {console.log('Server Started on port :'+PORT) })