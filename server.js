var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var helmet = require('helmet');
var morgan = require('morgan')
const bodyParser = require("body-parser")




var PORT = process.env.PORT || 7000;


const userRout=require('./routes/users')
const authRout=require('./routes/auth')
const postRout=require('./routes/post')


dotenv.config();

//database\
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true ,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error)=> console.log('error'));
db.once('open',()=> console.log('connected to db'));


app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/users' ,userRout);
app.use('/api/auth' ,authRout);
app.use('/api/post' ,postRout)

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));



app.listen(PORT,()=>{
    console.log(`app listening on localhost://${PORT}`);
})
