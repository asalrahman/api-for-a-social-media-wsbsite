const express = require('express');
const router = express.Router();
const Post = require('../models/post');


//create a post

router.post('/',async(req,res)=>{
    const post = new Post(req.body);
    try{
        
        await post.save();
        res.status(200).json(post)

    }catch(err){
    res.status(500).json(err)
    }
})

//update post

router.put('/:id',async(req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("updation successful")
        }else{
            res.status(403).json('cant change change others post')
        }

    }catch(err){
      res.status(400).json(err)
    }
})


//delete post
router.delete('/:id',async(req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("removed successful")
        }else{
            res.status(403).json('cant delete  others post')
        }

    }catch(err){
      res.status(400).json(err)
    }
})

//like a post and dislike 

router.put('/:id/like',async(req,res)=>{;
    const post = await Post.findById(req.params.id)
    try{
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$push : {likes : req.body.userId}});
           res.status(200).json('you likes this post');
        }else{
           await post.updateOne({$pull : {likes :req.body.userId}});
           res.status(403).json('the post hasbeen disliked');
        }
    }catch(err){
        res.status(500).json(err)
    }
});


//get a post 

router.get('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
res.status(500).json(err)
    }

})
module.exports = router;