require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const ctrl = require('./products_controller');

const app = express();

app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(err => console.error(err))

app.post('/api/product', ctrl.create);
app.get('/api/products', ctrl.getAll);
app.get('/api/product/:id', ctrl.getOne);
app.put('/api/product/:id', ctrl.update);
app.delete('/api/product/:id', ctrl.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port: ${port}`));