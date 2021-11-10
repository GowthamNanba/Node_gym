const express = require('express')
const router =express.Router()

const trainer= require('../models/trainer.model')
const user =require('../models/user.model')


router.post('/add_trainer',(req,res)=>{
    const create_trainer=new trainer({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email
    })
    
    create_trainer.save().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/add_user',(req,res)=>{
    const create_user=new user({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        pass:req.body.pass,
        trainer:req.body.trainer_id
    })
    
    create_user.save()
    .then(data => {
        const user_id=data._id;
        var newuser = { 
            userId:user_id,
            name:req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            joining:new Date(),
            status:"Active"
        };
    
            trainer.findOneAndUpdate(
            { _id: req.body.trainer_id }, 
            { $push: { users: newuser  } },
            ).then(trainer_ret=> {
                console.log("Users Added")
            })
            .catch(err =>{
                console.log("user not added in trainer")
            })
            console.log("User Created Successfully")
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/user_login',(req,res) => {

    user.find(
      { 'email': req.body.mail_id,'pass': req.body.pass},
      '_id mobile')
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/trainer_login',(req,res) => {

    trainer.find(
      { 'email': req.body.mail_id,'pass': req.body.pass},
      '_id mobile')
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_trainer').get((req, res) => {
    trainer.find()
      .then(trainer => res.json(trainer))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/get_trainer/:id').get((req, res) => {
    trainer.find({_id:req.params.id},'name meals workouts assessments')
      .then(trainer => res.json(trainer))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/get_user').get((req, res) => {
    user.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/get_user/:id').get((req, res) => {
    user.find({_id:req.params.id},'name meals workouts assessments')
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/get_trainer_users/:id').get((req, res) => {
    user.find({trainer:req.params.id},'name meals workouts assessments')
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
 

router.post('/add_master_workout',(req,res) => {
    console.log(req.body.trainer_id)
    var workouts = { 
        name:req.body.name,
        description:req.body.description,
        purpose:req.body.purpose,
        status:"Active"
    };
    
trainer.findOneAndUpdate(
   { _id: req.body.trainer_id }, 
   { $push: { workouts: workouts  } },
  ).then(data =>{
            console.log('Workout Added ')
           res.json(data)
        })
        .catch(error =>{
            console.log('Failed To Add Workout ')
           res.json(error)
        });
})

router.post('/add_master_meal',(req,res) => {
    console.log(req.body.trainer_id)
    var meals = { 
        name:req.body.name,
        description:req.body.description,
        purpose:req.body.purpose,
        status:"Active"
    };
    
trainer.findOneAndUpdate(
   { _id: req.body.trainer_id }, 
   { $push: { meals: meals  } },
  ).then(data =>{
            console.log('Meal Added ')
           res.json(data)
        })
        .catch(error =>{
            console.log('Failed To Add Meal ')
           res.json(error)
        });
})

router.post('/add_master_assessment',(req,res) => {
    console.log(req.body.trainer_id)
    var assessment = { 
        name:req.body.name,
        description:req.body.description,
        status:"Active"
    };
    
trainer.findOneAndUpdate(
   { _id: req.body.trainer_id }, 
   { $push: { assessments: assessment  } },
  ).then(data =>{
            console.log('Assessment Added ')
           res.json(data)
        })
        .catch(error =>{
            console.log('Failed To Add Assessment ')
           res.json(error)
        });
})




//User Section Weekly Training
//Insert Inside Nested
router.post('/user_meal_add',(req,res) => {
    
    var day_meal_add = { 
        name:req.body.name,
        period:req.body.type,
        description:req.body.description,
        purpose:req.body.purpose,
        trainer:req.body.trainer_id,
        date:Date.now("dd-mm-YYYY")
    };
    
    user.findOneAndUpdate(
   { _id: req.body.user_id }, 
   { $push: { meals: day_meal_add  } },
// Insert Inside Nested Subdocument
//    { $push: { "users.$[outer].weekly_meal" : day_meal_add } },
//     { "arrayFilters": [{ "outer._id": req.body.user_id }] }
  ).then(data =>{
            console.log('Meal Added to User ')
           res.json(data)
        })
        .catch(error =>{
            console.log('Failed To Add User ')
           res.json(error)
        });
})


router.post('/user_workout_add',(req,res) => {
    
    var day_workout_add = { 
        name:req.body.name,
        period:req.body.type,
        description:req.body.description,
        purpose:req.body.purpose,
        trainer:req.body.trainer_id,
        date:new Date()
    };
    
    user.findOneAndUpdate(
   { _id: req.body.user_id }, 
   { $push: { workouts: day_workout_add  } },
  ).then(data =>{

    // const ret=trainer.findById(req.body.trainer_id);

    //         console.log(`Result:p-${ret.name}`);
            console.log('Workout Added to User ')
           res.json(data)
        })
        .catch(error =>{
            console.log('Failed To Add User Workout ')
           res.json(error)
        });
})


router.route('/get_day_meal/:id/:date').get((req, res) => {  
  const date = new Date()
  console.log(date)
  const today = new Date(new Date().setHours(0,0,0,0))
  

  
  console.log(today)
  
  user.find(
      // {
      //    _id:req.params.id
      // },
      {
         "meals": { $elemMatch : { "date" : {"$gte": new Date(req.params.date)} } }
        //"meals": { $elemMatch : { "date" : {"$lte": today} } }
      },"meals")
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
});



//Link User And Trainer For Existing Trainer
router.route('/get_old_trainer').get((req, res) => {
  // user.aggregate([
  //     {
  //       $lookup: {
  //         from: "trainers",
  //         localField: "trainer",
  //         foreignField: "_id",
  //         as: "orders_info",
  //       },
  //     },
  //     {
  //       $unwind: "$orders_info",
  //     },
  //   ])
  user.aggregate([
      {
          "$project": {
            "_id": {
              "$toString": "$_id"
            }
          }
        },
        {
          "$lookup": {
            "from": "trainers",
            "localField": "_id",
            "foreignField": "users.userId",
            "as": "trainers"
          }
        },
        {
          $set: {
            trainers: { $arrayElemAt: ["$trainers", 0] }
          }
        }
    ])
      .then((result) => {
        console.log(result);
        res.json(result)
      })
      .catch((error) => {
        console.log(error);
      });
});

//Link User And Trainer For Existing Trainer
router.route('/mingle').get(async (req, res) => {
   const result= await user.findOne({});
   const { _id, name}= result.toObject();
   console.log(_id,name);
   res.json(result)
});
module.exports=router