const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const seedAll = require('./seeds');
const routes = require("./controllers");

//create app and initialize session variables
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


//turn on the connection to the db server
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    seedAll();
})