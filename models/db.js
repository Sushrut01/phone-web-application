const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PhoneBook',{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
  if(!err)
  {
    console.log('MongoDB connection Successful.');
  }
  else
  {
    console.log('Error in DB connection: '+ err);
  }
});

require('./phonebook.model');
