const env = require('dotenv').config();
require('./models/db'); // Connect to mongoose DB
require('./models/employee.model');
const express = require('express');
const employeeController = require('./controllers/employeeController');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expressHandlebars({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

if (env.error) {
  console.log('Error loading .env');
}

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

app.use('/employee', employeeController);





console.log(process.env.DB_URL);