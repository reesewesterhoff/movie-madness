console.log('server js loaded');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js')
const PORT = process.env.PORT || 5000;
const homeRouter = require('./routes/home.router');
const addRouter = require('./routes/add.router');
const manageRouter = require('./routes/manage.router');
const favoritesRouter = require('./routes/favorites.router');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/home', homeRouter);
app.use('/add', addRouter);
app.use('/manage', manageRouter);
app.use('/favorites', favoritesRouter);

app.listen(PORT, () => {
    console.log('server up on port:', PORT); 
});