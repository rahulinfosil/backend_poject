const mongoose= require('mongoose');

// creating a schemas
const productSchema= new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    userId:String,
    company:String
});
// users is collection should match to DB
module.exports = mongoose.model("products", productSchema);