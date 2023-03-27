const mongoose = require('mongoose');
const Userschema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,

    },
    profilepicture:{
        type:String,
        default:""
        
    },
   coverpicture:{
        type:String,
        default:""
        
    },
    followers:{
        type:Array,
        default:[]
        
    },
    followings:{
        type:Array,
        default:[]
        
    },
    isAdmin:{
        type:Boolean,
       required:false,
    },    
    desscrption:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
    type:Number,
    enum:[1,2,3]
    },
    
},
{timestamps:true}
);

module.exports = mongoose.model('User',Userschema);