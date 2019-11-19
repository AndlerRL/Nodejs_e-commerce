const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // this setting of 'views' is the default, but could be changed depending where .html are located. ex.: 'templates'

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

app.listen(8000);