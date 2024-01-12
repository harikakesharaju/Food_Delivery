const express=require("express")
const router=express.Router();

router.post("/fooddata",(Req,res)=>{
    try{
        //console.log(global.fooditems)
        //console.log(global.foodcat)
        res.send([global.fooditems,global.foodcat])
    }
    catch(e){
        console.log(e.message);
        res.send("server error")
    }
})

module.exports=router

/*
const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
    console.log("fooddata endpoint is hit"); // Add this line to check if the endpoint is accessed
    try {
        const foodItems = [
            {
                CategoryName: "Biryani/Rice",
                name: "Veg Fried Rice",
                img:
                    "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                options: [{ half: "110", full: "200" }],
                description:
                    "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added.",
            },
        ];
        console.log("Food Items:", foodItems); // Check if this log is appearing in the console
        res.json(foodItems);
    } catch (e) {
        console.error("Error:", e.message); // Check if this log is appearing in the console
        res.status(500).send("Server Error: " + e.message);
    }
});

module.exports = router;
*/

