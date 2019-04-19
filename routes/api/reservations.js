// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const reservation= require('../../models/Reservation');
const user  = require('../../models/User');
const location  = require('../../models/Location');
const jwt = require('jsonwebtoken')
const passport = require('passport')
//Get all reservations
router.get('/',passport.authenticate('jwt', {session: false}), async (req,res) => {
    const reservations = await reservation.find()
    res.json({data: reservations})
})

// Get a certain reservation 
router.get('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    const pid = req.params.id
	const X =await reservation.findOne({"_id":pid})
	if(!X)
        return res.status(404).send({error: 'Reservation does not exist'})
	else
        res.json({data:X});});
//Get the reservations of a certain user so that he can be able to see edit or delete them.
router.get('/client/res',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    req.body.client=""+req.user.id;
	const X =await reservation.findOne({"client":req.body.client})
	if(!X)
        return res.status(404).send({error: 'Reservation does not exist'})
	else
        res.json({data:X});}); 

router.get('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    req.body.client = ""+req.user.id;
    const pid = req.params.id
	const X =await reservation.findById(req.body.client)
	if(!X)
        return res.status(404).send({error: 'Reservation does not exist'})
	else
        res.json({data:X});});

// Create a reservation
router.post('/',passport.authenticate('jwt', {session: false}), async (req,res) => {
    
    try {
     const X=await location.findById(req.body.LocationID)
    for(let i=0;i<X.locationRooms.length;i++){
        if(X.locationRooms[i] == req.body.RoomID ){
         await reservation.create(req.body)
         return res.json({msg:'reservation requested successfully, it must be accepted first before being regiestered'})}
 
    }
    return res.json({msg:'There are no rooms with this name in the chosen Location'})

	}
	catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Insert a valid timing '})

	}  
 })

// Update a reservation's details
router.put('/confirmed/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{//Hay confirm w yeb3at notifications 
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
    return res.status(401).send('Unauthorized');
    const pid = req.params.id 
    const X = await reservation.findOne({'_id':pid})
    if(!X)
    return res.status(404).send({error: 'Reservation does not exist'})
    // if(X.status=='Allocation'||X.status=='Implementation'||X.status=='Completed'){
    //     return res.status(400).send({error: 'The Project cannot be edited anymore'})
    // }
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace" && req.user.id!=(""+X.OwnerId))
    return res.status(401).send('Unauthorized');
    await X.updateOne({status:true})
    res.json({msg: 'Reservation Accepted '})
})
router.put('/declined/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{//Hay confirm w yeb3at notifications 
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
    return res.status(401).send('Unauthorized');
    const pid = req.params.id 
    const X = await reservation.findOne({'_id':pid})
    if(!X)
    return res.status(404).send({error: 'Reservation does not exist'})
    // if(X.status=='Allocation'||X.status=='Implementation'||X.status=='Completed'){
    //     return res.status(400).send({error: 'The Project cannot be edited anymore'})
    // }
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace" && req.user.id!=(""+X.OwnerId))
    return res.status(401).send('Unauthorized');
    await X.updateOne({status:false})
    res.json({msg: 'Reservation Declined '})
})//Client want to see his accepted reservations
router.get('/confirmed/Yes',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==true&&reservations([i]).client==(""+req.user.id))
            result.push(reservations[i])
    }
    res.json({ data: result})
})//Owner want to see the accepted reservations he did
router.get('/confirmed/Yes',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==true)
            result.push(reservations[i])
    }
    res.json({ data: result})
})//Client want to see his Declined reservations
router.get('/confirmed/No',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==false&&reservations([i]).client==(""+req.user.id))
            result.push(reservations[i])
    }
    res.json({ data: result})
})//Owner want to see the declined reservations he did decline
router.get('/confirmed/No',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==false)
            result.push(reservations[i])
    }
    res.json({ data: result})
})
router.get('/confirmed/notYet',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
  return res.status(401).send('Unauthorized');
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==null&&reservations([i]).OwnerId==(""+req.user.id))
            result.push(reservations[i])
    }
    res.json({ data: result})
})
//getting a reservation of a certain coworking space
router.get('/CoWorking/notYet/:id',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    if(req.user.User_Category!="Admin"&&req.user.User_Category!="Partner_CoWorkingSpace")
  return res.status(401).send('Unauthorized');
    const pid = req.params.id 
    const reservations= await reservation.find();
    const result=[]
    for(let i=0;i<reservations.length;i++){
        if((reservations[i]).status==null&&(pid == (reservations[i]).OwnerId))
            result.push(reservations[i])
    }
    res.json({ data: result})
})
// Delete a reservation
router.delete('/cancelReservation/:id', passport.authenticate('jwt', {session: false}),async (req,res) => {

    try {
     const id = req.params.id
     if(req.body.status != true ){
     const deletedreservation = await reservation.findByIdAndRemove(id)
     res.json({msg:'reservation was deleted successfully', data: deletedreservation})}
     else{
         res.json({msg:'Reservation Has already been approved you cant dissaprove it online for more info please contact our support group' })
     }
    }
    catch(error) {
        console.log(error)
    }
 })


module.exports = router;
