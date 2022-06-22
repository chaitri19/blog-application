const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/blogs',{useNewUrlParser: true},(err) =>{
    if(!err){
        console.log("MongoDB connected successfully")
    }
    else
    {
        console.log("Error occured while connecting:"+err)
    }
})

require('../model/model')


