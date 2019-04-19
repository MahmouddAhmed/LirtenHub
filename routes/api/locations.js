// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const location= require('../../models/Location');
const user  = require('../../models/User');
const jwt = require('jsonwebtoken')
const passport = require('passport')

//Get all locations
router.get('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
    const locations = await location.find()
    res.json({data: locations})
})

// Get a certain location 
router.get('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
  const pid = req.params.id
	const X =await location.findOne({"_id":pid})
	if(!X)
        return res.status(404).send({error: 'Location does not exist'})
	else
		res.json({data:X});

})
//getting a location of a certain coworking space
router.get('/CoWorkingLocation/all',passport.authenticate('jwt', {session: false}),async  (req, res) => {
  const locations= await location.find();
  // const usr = await user.findOne({id})
  req.body.ownerID=""+req.user.id;
  const result=[]
  for(let i=0;i<locations.length;i++){
      if(((req.body.ownerID) == (locations[i]).ownerID))
          result.push(locations[i])
  }
  res.json({ data: result})
})
// Create a location
router.post('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
  if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
  return res.status(401).send('Unauthorized');
  req.body.ownerID=""+req.user.id;

  try {
    const newLocation = await location.create(req.body)
    const usr=await user.findOne({"_id":req.body.ownerID})
    if(!usr)
    return res.status(404).send({error: 'Location does not exist'})
    const result=usr.Locations
    result.push(newLocation._id)
    console.log(result)
    await usr.updateOne({'Locations':result})

  res.json({msg:'Location created successfully', data: newLocation})
 }
 catch(error) {
   console.log(error)
 }  
})

// Update a location's details
router.put('/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {
  if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
  return res.status(401).send('Unauthorized');
  req.body.ownerID=""+req.user.id;

  try {
   const id = req.params.id
   const locations = await location.findOne({"_id":id})
   if(!locations) return res.status(404).send({error: 'Location does not exist'})
   const updatedLocation = await location.updateOne(req.body)
   res.json({msg: 'Location updated successfully',data: updatedLocation})
   console.log(updatedLocation)
  }
  catch(error) {
      // We will be handling the error later
      console.log(error)
  }  
})

 // Delete a location
 router.delete('/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {
  if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
  return res.status(401).send('Unauthorized');  
  req.body.ownerID=""+req.user.id;

  try {
     const id = req.params.id
     const deletedlocation = await location.findByIdAndRemove(id)
     res.json({msg:'location was deleted successfully', data: deletedlocation})
    }
    catch(error) {
        console.log(error)
    }
 })


module.exports = router;
