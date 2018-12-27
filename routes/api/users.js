const express=require('express');
const mongoose=require('mongoose');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');

const {Users}=require('../../model/users');

const router=express.Router();

router.get('/test',(req,res)=> {
	res.json({"msg":"Working fine"});
	console.log(Users);
})
router.post('/register',(req,res)=>{
	Users.findOne({email:req.body.email},(err,user)=>{
		if(!user){
			const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: '404'}); //using gravatar library for avatar
			const newUser=new Users({   //creating user via mongo Users model
				name:req.body.name,
				email:req.body.email,
				password:req.body.password,
				avatar,
			});
			bcrypt.genSalt(10,(err,salt)=>{
				bcrypt.hash(newUser.password,salt,(err,hash)=>{
					if(err){
						console.log(err);
					}else{
						newUser.password=hash;
						newUser.save((err,user)=>{
							if(err){
								console.log(err);
							}else{
								res.json(user);
							}
						})
					}
				})
			});
		}else{
			res.status(400).json(user);
		}
	});	
});

module.exports=router;
