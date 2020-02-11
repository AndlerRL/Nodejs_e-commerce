require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/db');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');

const router = express.Router();

const app = express();

const PORT = process.env.PORT || 8000;
const pk = process.env.NODE_ENV === 'production' ? '9589f134-02e6-4090-ac9c-705ddb12f220' : 'd18c8c16-bd8b-4a4c-8b71-ca813db62a35';

app.set('view engine', 'ejs');
app.set('views', 'server/views'); // this setting of 'views' is the default, but could be changed depending where .html are located. ex.: 'templates'

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
  User.findByPk(pk)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(error.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Product);
User.hasMany(Order);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });


// In Production is not recommended to always overwrite the tables with
// .sync({ force: true }) but on development is ok to reflect new changes
// so we can see the interaction/changes.
sequelize.sync().then(res => {
  // Dummy User, since there's no auth process yet.
  return User.findByPk(pk);
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
  console.log(process.env.NODE_ENV);
  
  return user.createCart();
}).then(cart => {
  app.listen(PORT, () => {
    console.log(`App listening at PORT: ${PORT}`)
  });
}).catch(err => {
  console.log(err)
});
