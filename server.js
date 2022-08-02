const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

//create app and initialize session variables
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//turn on the connection to the db server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})