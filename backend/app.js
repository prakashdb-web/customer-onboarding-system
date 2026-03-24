const express = require('express');
const cors = require('cors');

const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

app.use('/api/customers', customerRoutes);

module.exports = app;