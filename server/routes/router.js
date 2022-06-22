const express = require('express');
const route=express.Router();
const Post=require("../model/model");
const axios=require('axios');

route.get('/',(req,res)=>{
  Post.find({},(err,docs)=>{
    if(!err)
    {
      res.render("list",{
        list:docs
      })
    }
    else
    {
      console.log("Error in retrieving blogs: "+ err);
    }
  })
})

route.get('/viewpage/:id',(req,res,next)=>{
  const _id=req.params.id;
  Post.findById(_id, (err,docs)=>{
    if(!err)
    {
      res.render("viewpage",{
        list:docs
      })
    }
    else
    {
      console.log("Error in retrieving blogs: "+ err);
    }
  })
})

route.get('/newblog',(req,res)=>{
  res.render('newblog');
})

route.post("/newblog", async(req,res) => {
  const newpost=new Post({
      title: req.body.title,
      image_url: req.body.image_url,
      content: req.body.content,
      date: req.body.date
  });
  try{
      const savedpost=await newpost.save();
      res.redirect('/')
      
      
  }catch(err){
      res.status(500).json(err)
  }
});

route.get('/editblog/:id',(req,res,next)=>{
  const _id=req.params.id;
  Post.findByIdAndUpdate(_id,req.body,{new:true},(err,docs)=>{
    if(err)
    {
      res.status(400).json(err)
    }
    else
    {
      res.render('update',{list:docs});
    }
  })
})

route.post('/editblog/:id',(req,res,next)=>{
  const _id=req.params.id;
  Post.findByIdAndUpdate(_id,req.body,{new:true},(err,docs)=>{
    if(err)
    {
      res.status(400).json(err)
    }
    else
    {
      res.redirect('/');
    }
  })
})

route.get('/deleteblog/:id',(req,res,next)=>{
  const _id=req.params.id;
  Post.findByIdAndDelete(_id,(err,docs)=>{
    if(err)
    {
      res.status(400).json(err)
    }
    else
    {
      console.log("Deleted Successfully");
      res.redirect('/');
    }
  })
})


/*route.get('/blogs',(req,res)=>{
  Post.find()
  .then(user =>{
    res.send(user)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})*/

/*route.post('/newblog',(req,res)=>{
  console.log(req.body)
})


route.get('/list',(req,res)=>{

  axios.get('http://localhost:3000/blogs')
  .then(function(response){
    console.log(response.data)
    res.render('list',{blogs:response.data})
  })
  .catch(err =>{
    res.status(500).json(err)
  })
})

route.put("/editblog/:id", async(req,res) => {
  if(!res.body)
  {
    return res.status(400).send({message:"Data to update cannot be empty"})
  }
  const id=req.params.id;
  Post.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
    if(!data)
    {
      res.status(404).send({message:"Cannot update blog information! May be blog does not exist."})
    }else{
      res.send(data)
    }
  })
    .catch(err=>{
      res.status(500).json(err)
  })
});*/


module.exports=route;