const express=require('express')
const router=express.Router()
const user=require('../models/User')
const jwt=require('jsonwebtoken');

const {body,validationResult} =require('express-validator')
const bcrypt=require("bcrypt");
const jwtsecret="jgsfvbcmmkloopouyrtgdeygfjsdh";

router.post("/createuser",[
body("email").isEmail(),
body("name").isLength({min:5}),
body("password","incorrect password").isLength({min:5})]
,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const salt=await bcrypt.genSalt(10);
    let secpass=await bcrypt.hash(req.body.password,salt)
    try{
        await user.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass,
            location:req.body.location
        })
        res.status(200).json({success:true})
    }catch(e){
        console.log(e)
    }
})



router.post("/login",[
    body("email").isEmail(),
    body("password","incorrect password").isLength({min:5})]
,async (req,res)=>{
    //console.log(req.body)
   let email=req.body.email
   const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array()});
   }
        try{
            let userdata=await user.findOne({email});
            if(!userdata){
                return res.status(400).json({errors:"try logging with correct inputs"})

            }
            const comp=bcrypt.compare(req.body.password,userdata.password)
            if(!comp){
                //console.log(userdata.password)
                return res.status(400).json({errors:"wrong password"})
            }
            const data={
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,jwtsecret)
            res.status(200).json({success:true,authToken:authtoken});
           }catch(e){
            console.log(e)
        }
    })

module.exports=router