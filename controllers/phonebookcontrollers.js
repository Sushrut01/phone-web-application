const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const PhoneBook = mongoose.model('PhoneBook');

router.get('/',(req,res)=>{
  res.render("phonebook/AddOrEdit",{
    viewTitle : "Insert New Contact"
  });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res)
{
  var phonebook = new PhoneBook();
  phonebook.name = req.body.name;
  phonebook.email = req.body.email;
  phonebook.mobile = req.body.mobile;
  phonebook.dob = req.body.dob;
  phonebook.save((err,doc)=>{
    if(!err)
    {
      res.redirect('phonebook/list');
    }
    else {
      if(err.name == 'ValidationError')
      {
        handleValidationError(err,req.body);
        res.render('phonebook/AddOrEdit',{
          viewTitle : "Insert New Contact",
          phonebook : req.body
        });
      }
      else
      {
      console.log('Error during record insertions : ' + err);
      }
    }
  });
}

function updateRecord(req, res) {
    PhoneBook.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('phonebook/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("phonebook/AddOrEdit", {
                    viewTitle: 'Update Contact',
                    phonebook: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list',(req,res)=>{
    PhoneBook.find().lean().exec((err,docs)=>{
      if(!err)
      {
        res.render('phonebook/list',{
          list : docs
        });
      }
      else {
        console.log('Error in retrieving contact list :' + err);
      }
    });
});

function handleValidationError(err,body)
{
  for(field in err.errors)
  {
    switch (err.errors[field].path) {
      case 'name':
        body['nameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:id', (req, res) => {
    PhoneBook.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("phonebook/AddOrEdit", {
                viewTitle: "Update Contact",
                phonebook: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    PhoneBook.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/phonebook/list');
        }
        else { console.log('Error in contact delete :' + err); }
    });
});

module.exports = router;
