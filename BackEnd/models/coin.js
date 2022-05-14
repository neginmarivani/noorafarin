const mongoose = require("mongoose")

const Schema = mongoose.Schema

const coinSchema = new Schema(
  {
    Date :{
        type: Date,
        required: true,
    },
    Open : {
        type : Float ,
        required : true,
    },
    High :{
        type : Float ,
        required : true,
    },
    Low : {
        type : Float ,
        required : true,
    },
    Close : {
        type : Float ,
        required : true,
    },
    Volume :{
        type : Int ,
        required : true,
    },
  }
)

module.exports = mongoose.model("Coin", coinSchema)