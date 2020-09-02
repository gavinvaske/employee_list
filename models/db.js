const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB_URL, (error) => {
  if (error) {
    console.log('Error occurred while connecting to database...');
    return;
  }
  console.log('Connection to Database was successful...');
});