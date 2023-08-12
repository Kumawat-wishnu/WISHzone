const mongoose=require("mongoose");


const connectDatabase=()=>{mongoose.connect(process.env.MONGO_URL)}
module.exports=connectDatabase
