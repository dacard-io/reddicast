// Root JS file for server
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Serve static asset files
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/", express.static(__dirname + '/'));
//app.use(express.static('assets'))
 
app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
 
app.get('/', function (req, res) {
    res.render('home');
});
 
app.listen(80);
console.log("Express running")