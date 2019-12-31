const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const sequelize = require('./util/db');
const Product = require('./models/product');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');

const router = express.Router();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // this setting of 'views' is the default, but could be changed depending where .html are located. ex.: 'templates'

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
/**
 * The next use of the middleware will be to store a user in my request so that I
 * can use it from anywhere in my app conveniently. 
 * So maybe here I'll add a new middleware, with this function, I want to reach out
 * to my database and retrieve my user with User.findByPk(${id}) and creating a
 * new req.user since, at the time is created is undefined and it can perfectly be
 * updated with the information that I subtract from the DB.
 * I used the next() function so the upcoming req can go on and on.
 */
app.use((req, res, next) => {
  User.findByPk('4af804fa-1205-469b-92cb-f5afc58cd031')
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/.netlify/functions/server', router);

app.use(error.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// In Production is not recommended to always overwrite the tables with
// .sync({ force: true }) but on development is ok to reflect new changes
// so we can see the interaction/changes.
sequelize.sync().then(res => {
  // Dummy User, since there's no auth process yet.
  return User.findByPk('4af804fa-1205-469b-92cb-f5afc58cd031');
}).then(user => {
  if (!user)
    User.create({
      firstname: 'Roberto',
      lastname: 'Lucas',
      email: 'test@admin.com'
    })

  return user;
}).then(user => {
  console.log(user);

  module.exports = app;
}).catch(err => {
  console.log(err)
})

module.exports.handler = serverless(app);
