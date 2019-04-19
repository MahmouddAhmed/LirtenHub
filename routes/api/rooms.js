// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const room= require('../../models/Room');
const location= require('../../models/Location');
const jwt = require('jsonwebtoken')
const passport = require('passport')
//Get all rooms
router.get('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
    const rooms = await room.find()
    res.json({data: rooms})
})

// Get a certain room 
router.get('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    const pid = req.params.id
	const X =await room.findOne({"_id":pid})
	if(!X)
        return res.status(404).send({error: 'room does not exist'})
	else
        res.json({data:X});});
        

//getting a locationRoom of a certain coworking space
router.get('/CoWorkingRoom/cowork/loc',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    req.body.OwnerId=""+req.user.id;

    const rooms= await Room.findOne({"OwnerId":req.body.OwnerId});
    // const usr = await user.findOne({id})
    const result=[]
    for(let i=0;i<rooms.length;i++){
        if(((req.body.OwnerId   +"") == (rooms[i]).OwnerId))
            result.push(rooms[i])
    }
    res.json({ data: result})
  })      
  //getting a locationRoom of a certain location
router.get('/certainLocation/room',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const rooms= await Room.find();
    // const usr = await user.findOne({id})
    const result=[]
    for(let i=0;i<rooms.length;i++){
        if(((req.body.LocationID) == (rooms[i]).LocationID))
            result.push(rooms[i])
    }
    res.json({ data: result})
  })    
// Create a room
router.post('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
    return res.status(401).send('Unauthorized');
    try {
        const X=await location.findById(req.body.LocationID)
        if(req.user.id!=(""+X.ownerID))
        return res.status(401).send('Unauthorized');
        const loc=await location.findOne({"_id":req.body.LocationID})
        const result=loc.locationRooms
       for(let i=0;i<X.locationRooms.length;i++){
           if(X.locationRooms[i] == req.body.Roomname )
              return res.json({msg:'The room you are trying to add already exists in the corresponding Location'})
         }
              const x = await room.create(req.body)
              result.push(x.Roomname)
              await loc.updateOne({'locationRooms':result})
              return res.json({msg:'Room added Successfully'})
     
       }
       catch(error) {
           console.log(error)
   
       }  
    // try {
    //  const newroom = await room.create(req.body)
    //  const loc=await location.findOne({"_id":req.body.LocationID})
    //  const result=loc.locationRooms
    //  result.push(newroom.Roomname)
    //  await loc.updateOne({'locationRooms':result})

	//  res.json({msg:'room added successfully', data: newroom})
	// }
	// catch(error) {
	// 	console.log(error)
	// }  
 })

 router.put('/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
    return res.status(401).send('Unauthorized');
    try {
     const id = req.params.id
     const rooms = await room.findOne({"_id":id})
     if(req.user.id!=(""+rooms.OwnerId))
     return res.status(401).send('Unauthorized');
     
     if(!rooms) return res.status(404).send({error: 'Room does not exist'})
     
     const updatedRoom = await rooms.updateOne(req.body)
     res.json({msg: 'Room updated successfully',data: updatedRoom})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
// Delete a room
router.delete('/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
    return res.status(401).send('Unauthorized');
    try {
     const id = req.params.id
     const allrooms = await room.findById(id)
     if(req.user.id!=(""+allrooms.OwnerId))
     return res.status(401).send('Unauthorized');
     const deletedroom = await room.findByIdAndRemove(id)
     const loc=await location.findOne({"_id":req.body.LocationID})
     const result=loc.locationRooms
     result.pop(allrooms.Roomname)
     await loc.updateOne({'locationRooms':result})
     res.json({msg:'room was deleted successfully', data: deletedroom})
    }
    catch(error) {
        console.log(error)
    }
 })


module.exports = router;
