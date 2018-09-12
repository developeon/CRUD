const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    title: String,
    description : String,
    status : Boolean
  });
  
module.exports = mongoose.model('Task', taskSchema);