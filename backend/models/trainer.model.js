const mongoose = require('mongoose')

const users= new mongoose.Schema({
  userId:{type:String},
  name:{type:String},
  mobile:{type:String},
  email:{type:String},
  joining:{type:Date},
  relieving:{type:Date},
  status:{type:String}
})
  const meal = new mongoose.Schema({
    name: {type: String,required:true},
    description: {type: String,},
    purpose: {type: String},
    status: {type: String}
  });

  const workout = new mongoose.Schema({
    name: {type: String,required:true},
    description: {type: String,},
    purpose: {type: String},
    status: {type: String}
  });

  const assessment = new mongoose.Schema({
    name: {type: String,required:true},
    description: {type: String},
    status: {type: String}
  });

const trainer_scheme= new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String},
    age:{type:Number},
    email:{type:String},
    pass:{type:String},
    users:[users],
    meals:[meal],
    workouts:[workout],
    assessments:[assessment]
})

module.exports =mongoose.model('trainer',trainer_scheme)