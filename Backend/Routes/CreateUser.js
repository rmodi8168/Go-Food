const express = require('express')
const router = express.Router()
const User=require("../models/User")
const { body, validationResult} = require('express-validator');
const { json } = require('react-router-dom');

router.post("/creatuser",[
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })], async(req,res)=> {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      
        return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email
    let fool=await User.findOne({email})
    console.log(fool)
    if (fool!=null) {
        return res.status(400).json("Email Allready Exist");
    }
    try{
        User.create({
            name: req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:req.body.password
        })
        res.json({success:true});
        
    }

    catch(error){
        console.log(error)
        res.json({success:false});
        localStorage.setItem('isSignUp','false')
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })], async(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
    try{
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Enter a Valid email"})
        }
        if(req.body.password !== userData.password){
            return res.status(400).json({errors: "Enter a Valid password"})            
        }
        return res.json({success:true})
    }

    catch(error){
        console.log(error)
        res.json({success:false});
    }
})

router.post("/getUserDetails",async(req,res)=>{
    let email=req.body.email
    let fool=await User.findOne({email})
    //console.log(fool.email,fool.name,fool.location)
    res.json({email:fool.email,name:fool.name,location:fool.location})
    return ""
})

module.exports = router;