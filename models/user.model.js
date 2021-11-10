const mongoose = require('mongoose')

const user_weekly_meal = new mongoose.Schema({
    date: {type: Date},
    name:{type: String,required:true},
    period:{type: String,required:true},
    description: {type: String},
    purpose: {type: String},
    image: {type: String},
    trainer: {type: String},
    status:{type:String}
});

const user_weekly_workout = new mongoose.Schema({
  date: {type: Date},
  name:{type: String,required:true},
  period:{type: String,required:true},
  description: {type: String},
  purpose: {type: String},
  image: {type: String},
  trainer: {type: String},
  status:{type:String}
});

const user_weekly_assessment = new mongoose.Schema({
  date: {type: Date,required:true},
  description: {type: String},
  trainer: {type: String},
  status:{type:String}
});


const user_scheme= new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String},
    email:{type:String},
    pass:{type:String},
    age:{type:Number},
    trainer:{type:String},
    address:{type:String},
    meals:[user_weekly_meal],
    workouts:[user_weekly_workout],
    assessments:[user_weekly_assessment]
})

module.exports =mongoose.model('users',user_scheme)