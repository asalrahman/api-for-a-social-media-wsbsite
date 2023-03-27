const express  = require ('express');
const router = express.Router();
const User = require('../models/users');

const bcrypt = require('bcrypt')


//edit user
router.put('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
if(req.body.password){
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password ,salt)
    } catch (err) {
        res.status(500).json(err)
    }

}try {
    await User.findOneAndUpdate(req.body.id ,{$set:req.body})
    res.status(200).json('user upadation successful')
} catch (err) {
    res.status(400).json(err)
}


    }else{
   return  res.status(400).json("you can't update your account")
    }
})


//delete account

router.delete('/:id',async(req,res)=>{
if(req.body.userId === req.params.id || req.body.isAdmin){

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted')
    } catch (error) {
        res.status(400).json(error)
    }
}else{
    return  res.status(400).json("you can only delete your acc only ")

}
})



//get a user

router.get('/:id', async (req,res)=>{
   try {
   const user =  await User.findById(req.params.id);
   const {password,updatedAt,...others}=user._doc
    res.status(200).json(others);
   } catch (error) {
    res.status(400).json(error);
   }
 
   
})

//follow a user
router.put('/:id/follow',async(req,res)=>{
    if(req.body.userId !== req.params.id){
try{
const user = await User.findById(req.params.id);
const currentUser = await User.findById(req.body.userId);
 if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}})
        await currentUser.updateOne({$push:{followings:req.params.id}})
    res.status(200).json('followed successfuly')
 }else{
    return res.status(403).json('already followed')
 }


}catch(err){
res.status(500).json(err)
}
    }else{
       return res.status(403).json('you cant follow your self')
    }
})

//unfollow
router.put('/:id/unfollow',async(req,res)=>{
    if(req.body.userId !== req.params.id){
try{
const user = await User.findById(req.params.id);
const currentUser = await User.findById(req.body.userId);
 if(user.followers.includes(req.body.userId)){
        await user.updateOne({$pull:{followers:req.body.userId}})
        await currentUser.updateOne({$pull:{followings:req.params.id}})
    res.status(200).json('unfollowed successfuly')
 }else{
    return res.status(403).json('you cant unfollow this user')
 }


}catch(err){
res.status(500).json(err)
}
    }else{
       return res.status(403).json('you cant ufollow your self')
    }
})


module.exports = router;