const express = require("express");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(express.static('static'));

// SUM routes
app.get('/', (req, res) => {
    res.render('home');
})

// Import controllers
app.use('/dinos', require('./routes/dinos'));
app.use('/cryptids', require('./routes/cryptids'));

// listen to port
app.listen(3000, () => console.log(`You're listening to the smooth sound of port 3000`));