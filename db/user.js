const mongoose= require('mongoose');

// creating a schemas
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
// users is collection should match to DB
module.exports = mongoose.model("users", userSchema);