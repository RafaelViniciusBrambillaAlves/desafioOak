const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const Product = require('./models/product');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite apenas localhost:3000
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permite esses métodos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permite os cabeçalhos necessários
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Test route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// CRUD routes
app.use('/products', require('./routes/products'));

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Sync database
sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(3000); // Mantendo a porta original
  })
  .catch(err => console.log(err));
