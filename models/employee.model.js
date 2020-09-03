const mongoose = require('mongoose');

let validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'This field is required'
  },
  email: {
    type: String,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter a valid email address']
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  }
});

mongoose.model('Employee', employeeSchema);