const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const seedAll = require('./seeds');
const routes = require("./controllers");


//create app and initialize session variables
const app = express();
const PORT = process.env.PORT || 3002;

// create view engine for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.get('/', (req, res)=>{
    res.render('home');
})

//turn on the connection to the db server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    seedAll();
})