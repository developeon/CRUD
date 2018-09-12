const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../model/task.js');

mongoose.connect('mongodb://localhost/BBS');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

/* GET home page. */
router.get('/', function(req, res) {
  Task.find((err, tasks) => {
    if(err) throw err;
    res.render('index', { title: 'CRUE', tasks: tasks } );
  });
});

router.post('/add', function(req, res) {
  let body = req.body;
  body.status = false;
  Task.create(body, function (err) { //TODO : create 메서드 분석
    if (err) throw err;
    res.redirect('/');
  });
 
});

router.get('/turn/:id', (req, res)=>{
  let id = req.params.id;
  Task.findById(id, (err, task) =>{
    if(err) throw err;
    task.status = !task.status;
    task.save()
      .then(() => res.redirect('/'));
  });
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  Task.remove({_id : id}, (err) =>{
    if(err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
