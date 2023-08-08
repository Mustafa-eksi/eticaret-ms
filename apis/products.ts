import { mongoose } from "@typegoose/typegoose";
import { ProductModel } from "../database/models/product";

const productsexp = require("express");
const productsapp = productsexp();
productsapp.use(productsexp.json())

var cors = require('cors');
productsapp.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3002", "http://localhost:8080"]
}))

const path = require('path')
console.log(path.join(__dirname, "../images"))
productsapp.use(productsexp.static(path.join(__dirname, "../images")))

productsapp.get("/getAllProducts", async (req:any, res:any)=>{
    let all = await ProductModel.find();
    res.send(all)
})

productsapp.post("/getProduct", async (req:any, res:any)=>{
    console.log("body:", req.body)
    let p = await ProductModel.findOne({_id: new mongoose.Types.ObjectId(req.body.productid)});
    res.send(p)
});
  
productsapp.post("/getProducts", async (req:any, res:any)=>{
    let ps = [];
    for(let i = 0; i < req.body.products.length; i++) {
      console.log(i, req.body.products[i])
      ps.push(await ProductModel.findOne({_id: new mongoose.Types.ObjectId(req.body.products[i])}));
    }
    res.send({products:ps})
});

productsapp.listen(3001 , () => {
    console.log(`[server]: product microservice is running at http://localhost:3001`);
});

export { productsapp }