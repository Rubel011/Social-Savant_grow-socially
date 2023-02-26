const mongoose=require("mongoose");


const blogSchema=mongoose.Schema({
    author:{type:String,required:true},
    title:{type:String,required:true},
    date:{type:String,required:true},
    body:{type:String,required:true},
    bimg:{type:String,required:true},
    aimg:{type:String,required:true},
    // publication:{type:String,required:true},
    type:{type:String,required:true},
},{
    versionKey:false
})

const BlogModel=mongoose.model("blog",blogSchema);

module.exports={BlogModel}