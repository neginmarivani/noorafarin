const mongoose = require("mongoose")

const Schema = mongoose.Schema

const coinSchema = new Schema(
  {
    Date :{
        type: String,
        required: true,
    },
    Open : {
        type : Number ,
        required : true,
    },
    High :{
        type : Number,
        required : true,
    },
    Low : {
        type : Number ,
        required : true,
    },
    Close : {
        type : Number,
        required : true,
    },
    Volume :{
        type : Number ,
        required : true,
    },
  }
)

module.exports = mongoose.model("Bitcoin", coinSchema ,"BTC" )