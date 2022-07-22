const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/user');
const Product = require('./db/product');
const app = express();

// adding middleware 
app.use(express.json());
app.use(cors());

// for SignUP
app.post("/register", async (req, resp) => {
    let user = new User(req.body); //storing in our user collection
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})

// for login
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        } else {
            resp.send({ result: "No user Found" })
        }
    } else {
        resp.body({ result: "Error" })
    }
})


// for Product API
app.post("/add-product", async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// get API
app.get("/products", async (req,resp)=>{
    const products = await Product.find();
    // checks the length of the products
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No Product found"})
    }
})

// Delete API
app.delete("/product/:id", async (req,resp)=>{
    let result = await Product.deleteOne({ _id: req.params.id});
    resp.send(result)
}),

// Get API
app.get("/product/:id", async (req,resp)=>{
    let result = await Product.findOne({_id: req.params.id})
    if(result){
        resp.send(result)
    }else
    {
        resp.send({"result":"No Result Found"})
    }
})

//Put API for update
app.put("/product/:id", async (req,resp) => {
    let result =await Product.updateOne(
        { _id: req.params.id},
        {$set: req.body}
    )
    resp.send(result)
})

// Search API
app.get("/search/:key", async(req,resp)=>{
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key } 
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result); 
})
app.listen(5000);