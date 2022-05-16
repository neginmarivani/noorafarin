
const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/signals' , options)
.then(()=> {
  console.log('database is connected successfully');
})
.catch(err => console.error('could not connect to MongoDB...' , err));


const signalSchema = new mongoose.Schema({
    signal_number :Number ,
    signal_status :
});