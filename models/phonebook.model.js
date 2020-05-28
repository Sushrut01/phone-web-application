const mongoose = require('mongoose');

var phonebookschema = new mongoose.Schema({
  name: {
    type : String,
    required : 'This field is required.'
  },
  email : {
    type : String
  },
  mobile : {
    type : String,
    required : 'This field is required.'
  },
  dob : {
    type : String,
    required : 'This field is required.'
  }
});

phonebookschema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('PhoneBook',phonebookschema);
