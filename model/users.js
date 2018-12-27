const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	},
	avatar:{
		type:String,
	},
	date:{
		type:String,
		default:Date.now,
	},
}
);

module.exports={
	Users: mongoose.model('users', userSchema),
}
