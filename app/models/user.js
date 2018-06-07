const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Users schema, with name as string
const UserSchema = new Schema({
  'name' : String
});

module.exports = mongoose.model('User', UserSchema);