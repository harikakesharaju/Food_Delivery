const mongoose=require("mongoose")

const Schema =mongoose.Schema;

const ordersch=new Schema({
    name:{
        type:String,
        required:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model("Orders",ordersch);

