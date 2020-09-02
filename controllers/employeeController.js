const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.render('employee/addOrEdit', {
    viewTitle: 'Insert Employee'
  });
});

module.exports = router;