const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter the product's description"]
    },
    price:{ 
        type:Number,
        required:[true,"please enter product's price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please enter produt catagory"]
    },
    Stock:{
        type:String,
        required:[true,"please enter product's stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1,
       
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema);