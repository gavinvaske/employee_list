const express = require('express');
const { response } = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (request, response) => {
  response.render('employee/addOrEdit', {
    viewTitle: 'Insert Employee'
  });
});

router.get('/list', (request, response) => {
  Employee.find((error, employees) => {
    if (error) {
      console.log('ERROR while retrieving employees from database');
      response.status(404).json('No employees found in DB');
    } else {
      response.render('employee/list', {
        list: JSON.parse(JSON.stringify(employees))
      });
    }
  });
});

router.post('/', (request, response) => {
  insertRecord(request, response);
  // response.status(200).send('submitted form successfully');
});

function insertRecord(request, response) {
  let employee = new Employee();
  employee.fullName = request.body.fullName;
  employee.email = request.body.email;
  employee.mobile = request.body.mobile;
  employee.city = request.body.city;
  employee.save((error, doc) => {
    if (!error) {
      response.redirect('employee/list');
    } else {
      if (error.name == 'ValidationError') {
        handleValidationError(error, request.body);
        response.render('employee/addOrEdit', {
          employee: request.body
        });
      }
      console.log('Error occurred while saving Employee object to database');
    }
  });

}

function handleValidationError(error, body) {
  for (field in error.errors) {
    switch (error.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = error.errors[field].message;
        break;
      case 'email':
        body['emailError'] = error.errors[field].message;
        break;
    }

  }
}


module.exports = router;