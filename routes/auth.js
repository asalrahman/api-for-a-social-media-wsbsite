const express  = require ('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt')

//register
router.post('/register', async(req,res)=>{
 console.log(req.body)
  try {

 //hash password
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   
    //create new user
    const user = new User({username:req.body.username ,
        email:req.body.email ,
        password:hashedPassword,
     })
    // save user 
        await user.save();
        res.status('200').json(user);

    } catch (error) {
     console.log(error);
   }
   })


//login

router.post('/login', async(req,res)=>{
try {
    const user = await User.findOne({email:req.body.email})
    !user && res.status(400).json('not found user');

   const validPassword = await bcrypt.compare(req.body.password , user.password);
  !validPassword && res.status(400).json('password not found');

res.status(200).json(user);
} catch (error) {
 console.log(error)
}

});

module.exports = router;