
/*const express=require("express")
const router=express.Router()
const Orders= require("../models/Orders")
const CircularJSON = require('circular-json');

router.post('/orders',async (req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{order_data:req.body.order_data});

    let eid=await Orders.findOne({email:req.body.email})
    console.log(eid);
    if(eid ===null){
        try{
            await Orders.create({
                email:req.body.email,
                
                order_data:[data]
            }).then(()=>{
                res.json({success:true});
            })
            //console.log(email)
        }
        catch(e){
            console.log("here")
            console.log(CircularJSON.stringify(e));
            // Assuming you have access to 'res' in your Express route handler
            res.status(400).send({ message: 'server error' });

        }
    }
    else{
        try{
            await Orders.findOneAndUpdate({email:req.body.email},
                {$push:{order_data}}).then(()=>{
                    res.json({success:true});
                })
        }
        catch(e){
            // Assuming you have access to 'res' in your Express route handler
res.status(400).send({ message: 'server error' });

        }
    }
})
module.exports=router 
*/

const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const CircularJSON = require('circular-json');

router.post('/orders', async (req, res) => {
  let data = req.body.order_data;
  //console.log(data)
  await data.splice(0, 0, { order_date: req.body.order_date });

  let eid = await Orders.findOne({'name': req.body.email });//line1 
  //console.log("heyy",eid);//line11
  if (eid === null) {
    try {
      await Orders.create({
        name: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (e) {
      console.error("Error: ", CircularJSON.stringify(e));
      // Assuming you have access to 'res' in your Express route handler
      res.status(400).send({ message: 'server error' });
    }
  } else {
    try {
      await Orders.findOneAndUpdate({ name: req.body.email },
        { $push: { order_data:data } }).then(() => {
          res.json({ success: true });
        });
    } catch (e) {
      // Assuming you have access to 'res' in your Express route handler
      res.status(400).send({ message: 'server error' });
    }
  }
});

router.post("/myorders",async (req,res)=>{
    try{
        let mydata=await Orders.findOne({"name":req.body.email})
        //console.log("hereeee"+mydata.order_data[0][1].id)
        res.json({order_data:mydata.order_data})
    }
    catch(e){
        res.status(400).send("server error",e.message)
    }
})

module.exports = router;
