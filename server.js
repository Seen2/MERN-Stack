const express=require('express'),
	bodyParser=require('body-parser'),
	mongoose=require('mongoose'),
	{URI}=require('./config/keys');

const users=require('./routes/api/users');
const posts=require('./routes/api/posts');
const profile=require('./routes/api/profile');

//console.log(JSON.stringify(URI));


mongoose.connect(URI, { useNewUrlParser: true })


const app=express();

app.get('/',(req,res)=>{
	res.send('hello');
});

app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const port=5000;// || process.env.PORT 

app.listen(port,()=>console.log(`listening on port ${port}...`));
