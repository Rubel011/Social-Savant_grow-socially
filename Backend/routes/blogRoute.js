const express = require("express");
const { BlogModel } = require("../models/blogModel")
const blogRoute = express.Router()
require("dotenv").config()
const cloudinary=require("cloudinary").v2
const jwt = require("jsonwebtoken")
cloudinary.config({ 
    cloud_name: 'daqibyc29', 
    api_key: '836321323429358', 
    api_secret: 'IIrWiTqSKiwcuLl_4dwTdC5Ltxc',
    secure: true
  });
blogRoute.get("/", async (req, res) => {
    try {
        let data = await BlogModel.find();
        res.send(data)
    }
    catch (err) {
        res.send(err.message)
    }
})



blogRoute.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        await BlogModel.findByIdAndDelete({ _id: id });
        res.send({ "msg": `user has been deleted with id ${id}` })
    }
    catch (err) {
        res.send(err.message)
    }
})


blogRoute.post("/add", async (req, res) => {
    try {
        let data= new BlogModel(req.body)
        await data.save();
        res.send({"success":"blog added successful"})
    }
    catch (err) {
        res.send({ "msg": "something went wrong", "error": err.message })
    }
})

blogRoute.patch("/update/:id",async(req,res)=>{
    try {
        await BlogModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send({"success":"blog update successful"})
    } catch (err) {
        res.send({ "msg": "something went wrong", "error": err.message })
    }
})

module.exports = { blogRoute };