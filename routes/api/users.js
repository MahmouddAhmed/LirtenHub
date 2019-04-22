const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validator = require('../../validations/userValidations');
const router = express.Router();
const User = require('../../models/User');
const Skill = require('../../models/Skill');
const tokenKey = require('../../config/keys').secretOrKey
const Project = require('../../models/Project');
const nodemailer = require('nodemailer');

//All Users
router.post('/login',async (req, res) => {
	try {
        
        const { Email, Password } = req.body;
        const isValidated = validator.loginValidation (req.body);
		if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

		const user = await User.findOne({'Email':Email });
        if (!user) 
			return res.status(404).json({ error: 'Email does not exist' });
		// if(user.User_Category=="Admin"){
		// 	if(user.Hashed_password==Password){

		// 	const payload = {
        //         id: user._id,
		// 		User_Category:user.User_Category,
		// 		Email:user.Email
        //     }
        //     const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' })
		// 	await user.updateOne({'Islogedin':true})
			
		// 	res.json({data: `Bearer ${token}`})}
		// 	else return res.status(400).send({ error: 'Wrong password' });

		// }
		
		if(user.Membership_expiration_date!=null){
		const d=new Date()
		const yd=user.Membership_expiration_date.getFullYear()-d.getFullYear()
		const md=user.Membership_expiration_date.getMonth()-d.getMonth()
		const dd=user.Membership_expiration_date.getDay()-d.getDay()
		if(yd<0)
			await user.updateOne({"Valid":false})
		if(yd==0){
			if(md<0){
				await user.updateOne({"Valid":false})
			}
			if(md==0){
				if(dd<=0){
					await user.updateOne({"Valid":false})
				}
			}
		}}
		const k = await User.findOne({'Email':Email });
		if(k.Valid==false)
			return res.status(404).json({ error: 'Mebership Expired or account not verified yet' });
		const match = bcrypt.compareSync(Password, user.Hashed_password);
		
		if (match) {
            const payload = {
                id: user._id,
				User_Category:user.User_Category,
				Email:user.Email
            }
            const token = jwt.sign(payload, tokenKey, { expiresIn: '4h' })
			await user.updateOne({'Islogedin':true})
			
            res.json({data: `Bearer ${token}`})
            
           
            
        }
		else return res.status(400).send({ error: 'Wrong password' });
	} catch (e) {
        
    }
});
router.get('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
    const locations = await User.find()
    res.json({data: locations})
})

router.post('/register', async (req, res) => {
	try {
		if(!req.body.Password)
		return res.status(400).send({ error:'Please Enter Password'})

		let isValidated;

		if(req.body.User_Category=='Member')
			isValidated = validator.registerValidationM(req.body)
		else if(req.body.User_Category=='Consulting_Agent')
			isValidated = validator.registerValidationCons(req.body)
		else if(req.body.User_Category=='Partner')
			isValidated = validator.registerValidationP(req.body)
		else if(req.body.User_Category=='Partner_CoWorkingSpace')
			isValidated = validator.registerValidationCOWS(req.body)
		else
			return res.status(400).send({ error:'we dont support other users here'})

		
		if (isValidated.error) 
			return res.status(400).send({ error: isValidated.error.details[0].message });
		const user = await User.findOne( {'Email':req.body.Email});
		if (user) 
			return res.status(400).json({ error: 'Email already exists' });
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.Password, salt);
		req.body.Hashed_password=hashedPassword
		const newUser=await User.create(req.body);
		const age=((new Date()).getFullYear())-(newUser.Birth_Date.getFullYear())
		await newUser.updateOne({'Age':age})
		const Z=await User.findOne({'_id':newUser._id})
		
		
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'lirtenhubn.a@gmail.com', // generated ethereal user
          pass: 'madolirten1234'  // generated ethereal password
      },
    
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'LirtenHub@Lirten.com', // sender address
        to: req.body.Email, // list of receivers
        subject: 'Registration', // Subject line
        text: 'Congrats you are now only one step away to Join LirtenHub  \n please join us at our HeadQuarters so you can sign the contract', // plain text body
         // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        
    });
     


		res.json({ msg: 'User created successfully', data: Z });
	} catch (error) {
		console.log(error)
		res.status(422).send({ error: 'Can not create user' });
	}
});

router.put('/validate/:id',async(req,res)=>{
	const user=await User.findOne({'_id':req.params.id})
	await user.updateOne({'Valid':true})
	const z=new Date();
	const newdate=new Date((z.getFullYear()+1),z.getMonth(),z.getDay())
	await user.updateOne({'Membership_expiration_date':newdate})
	if(user.Join_Date==null){
	await user.updateOne({'Join_Date':z})
	
	}
	res.json({msg:'OK'})
})

router.get('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
	const X=await User.findOne({'_id':req.params.id},{"Hashed_password":0})
	if(!X)
	return res.status(400).send({ error:'User Does Not exist'})
	if(X.Birth_Date!=null){
	const age=((new Date()).getFullYear())-(X.Birth_Date.getFullYear())
	await X.updateOne({'Age':age})
	}
	const newUser= await User.findOne({'_id':req.params.id},{Hashed_password:0})
	res.json({Data:newUser})
})

router.get('/getbytype/:type',async(req,res)=>{
	const 	X=await User.find({'User_Category':req.params.type})
	res.json({Data:X})
	
})

router.delete('/:id',async(req,res)=>{
	try{
	const deletedU=await User.findByIdAndRemove(req.params.id)
	res.json({msg:'User was deleted successfully', data: deletedU})
	}
	catch{

	}
})
router.put('/:id',async(req,res)=>{
const user=await User.findOne({'_id':req.params.id})
const type=user.User_Category
let isValidated
if(type=='Member'){
	isValidated = validator.updateValidationM(req.body)
}
else if(type=='Consulting_Agent'){
	isValidated = validator.updateValidationCons(req.body)
}
else if(type=='Partner'){
	isValidated = validator.updateValidationP(req.body)
}
else if(type=='Partner_CoWorkingSpace'){
	isValidated = validator.updateValidationCOWS(req.body)
}
if (isValidated.error) 
			return res.status(400).send({ error: isValidated.error.details[0].message });

const result=user.Requested_updates_in_profile
result.push(req.body)
await user.updateOne({'Requested_updates_in_profile':result})
res.json({msg:'OK'})
})
router.put('/approveupdate/:id',async(req,res)=>{
	const user= await User.findOne({'_id':req.params.id})
	const result=[]
	
	const updates=(user.Requested_updates_in_profile[0])

	for(let i=1;i<user.Requested_updates_in_profile.length;i++)
			 result.push(user.Requested_updates_in_profile[i])
	 await user.updateOne({'Requested_updates_in_profile':result})
	 await user.updateOne(updates)
	res.json({msg:'OK'})

})
router.put('/declineupdate/:id',async(req,res)=>{
	const user= await User.findOne({'_id':req.params.id})
	const result=[]

	for(let i=1;i<user.Requested_updates_in_profile.length;i++)
			 result.push(user.Requested_updates_in_profile[i])
	 await user.updateOne({'Requested_updates_in_profile':result})
	res.json({msg:'OK'})

})
router.get('/pending/update',async(req,res)=>{
	const Users=await User.find()
	const result=[]
	for(let i=0;i<Users.length;i++)
		if(Users[i].Requested_updates_in_profile.length!=0)
			result.push({user:Users[i],Updates:Users[i].Requested_updates_in_profile[0]})
	res.json({data:result})

})
router.post('/changepassword/:id',async(req,res)=>{
	const newpassword=req.body.newpassword
	const confirm=req.body.confirm
	if(newpassword!=confirm){
		return res.status(400).send({ error:'not a match'});
	}
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(newpassword, salt);
	const U=await User.find({'_id':req.params.id})
	await U.updateOne({'Hashed_password':hashedPassword})
	res.json({msg:'OK'})

})
router.put('/Logout/:id',async(req)=>{
	const X=await User.findOne({'_id':req.params.id})
	console.log(X)
	await X.updateOne({'Islogedin':false})
	
})
//Member 
router.put('/addinterest/:id', async (req, res) => {
	const X = await User.findOne({"_id":req.params.id})
	if(!X)
		return res.status(404).send({error: 'User does not exist'})
	const result=X.Intrests
	result.push(req.body.Interest)
	await X.updateOne({'Intrests':result})
	res.json({msg:'OK'})
})
router.delete('/delinterest/:id', async (req, res) => {
	const z=req.body.Interest
	const X = await User.findOne({"_id":req.params.id})
	if(!X)
		return res.status(404).send({error: 'User does not exist'})
	const result=[]
	for(let i=0;i<X.Interests.length;i++)
		if(X.Interests[i]!=z)
			result.push(X.Interests[i])
	await X.updateOne({'Intrests':result})
	res.json({msg:'OK'})
})
router.put('/applyskill/:id',async (req, res) => {
	const Uid=req.params.id
	const X = await User.findOne({'_id':Uid})
    if(!X)
		return res.status(404).send({error: 'User does not exist'})
	if(X.Applied_Skills.includes(req.body.Skill))
		return res.status(400).send({error: 'Your request on this skill is being Processed'})
	if(X.Skills.includes(req.body.Skill))
	return res.status(400).send({error: 'You Already Have this Skill'})
    const Y=await Skill.findOne({'_id':req.body.Skill})
    if(!Y)
        return res.status(400).send({error: 'We dont support that skill in lirten'})
    X.Applied_Skills.push(req.body.Skill)
    await X.updateOne({"Applied_Skills":X.Applied_Skills})
    res.json({msg: 'OK'})
});
router.put('/approveSkill/:id',async(req,res)=>{
	const X=await User.findOne({'_id':req.params.id})
	if(!X)
		return res.status(404).send({error: 'User does not exist'})
	const Y=await Skill.findOne({'_id':req.body.Skill})
	if(!Y)
		return res.status(400).send({error: 'We dont support that skill in lirten'})
	X.Skills.push(req.body.Skill)
	const result=[]
	for(let i=0;i<X.Applied_Skills.length;i++)
		if(X.Applied_Skills[i]!=req.body.Skill)
			result.push(X.Applied_Skills[i])
	await X.updateOne({'Applied_Skills':result})
	await X.updateOne({'Skills':X.Skills})
	res.json({msg: 'OK'})
})
router.put('/declineSkill/:id',async(req,res)=>{
	const X=await User.findOne({'_id':req.params.id})
	if(!X)
		return res.status(404).send({error: 'User does not exist'})
	const Y=await Skill.findOne({'_id':req.body.Skill})
	if(!Y)
		return res.status(400).send({error: 'We dont support that skill in lirten'})
	
	const result=[]
	for(let i=0;i<X.Applied_Skills.length;i++)
		if(X.Applied_Skills[i]!=req.body.Skill)
			result.push(X.Applied_Skills[i])
	await X.updateOne({'Applied_Skills':result})
	res.json({msg: 'OK'})
})
router.get('/pending/Skill',async(req,res)=>{
	const U=await User.find()
	const result=[]
	for(let i=0;i<U.length;i++)
		for(let j=0;j<U[i].Applied_Skills.length;j++)
			result.push({user:U[i],skill:U[i].Applied_Skills[j]})
	return res.json({Data: result})
})
router.post('/Certificate/:id', async (req, res) => {
	const Certificate=req.body.Certificate
	const user=await User.find({'_id':req.params.id})
	const result=user.Certificates
	result.push(Certificate)
	await user.updateOne({'Certificates':result})
	res.json({msg:'OK'})
});	
router.delete('/Certificates/:id', async (req, res) => {
	const Certificate=req.body.Certificate
	const user=await User.find({'_id':req.params.id})
	const result=[]
	for(let i=0;i<user.Certificates.length;i++)
		if(user.Certificates[i]!=Certificate)
			result.push(user.Certificates[i])
	await user.updateOne({'Certificates':result})
	res.json({msg:'OK'})
});	
//consultancy
router.post('/BoardMembers/:id', async (req, res) => {
	const Board_member=req.body.Board_member
	const user=await User.find({'_id':req.params.id})
	const result=user.Board_members
	result.push(Board_member)
	await user.updateOne({'Board_members':result})
	res.json({msg:'OK'})
});	
router.delete('/BoardMembers/:id', async (req, res) => {
	const Board_member=req.body.Board_member
	const user=await User.find({'_id':req.params.id})
	const result=[]
	for(let i=0;i<user.Board_members.length;i++)
		if(user.Board_members[i]!=Board_member)
			result.push(user.Board_members[i])
	await user.updateOne({'Board_members':result})
	res.json({msg:'OK'})
});
router.post('/Studies/:id', async (req, res) => {
	const Studie=req.body.Studie
	const user=await User.find({'_id':req.params.id})
	const result=user.Studies
	result.push(Studie)
	await user.updateOne({'Studies':result})
	res.json({msg:'OK'})
});	
router.delete('/Studies/:id', async (req, res) => {
	const Studie=req.body.Studie
	const user=await User.find({'_id':req.params.id})
	const result=[]
	for(let i=0;i<user.Studies.length;i++)
		if(user.Studies[i]!=Studie)
			result.push(user.Studies[i])
	await user.updateOne({'Studies':result})
	res.json({msg:'OK'})
});	
//co-working			
router.post('/Business_Plans_Offered/:id', async (req, res) => {
	const Plan=req.body.Plan
	const user=await User.find({'_id':req.params.id})
	const result=user.Business_Plans_Offered
	result.push(Plan)
	await user.updateOne({'Business_Plans_Offered':result})
	res.json({msg:'OK'})
});	
router.delete('/Business_Plans_Offered/:id', async (req, res) => {
	const Plan=req.body.Plan
	const user=await User.find({'_id':req.params.id})
	const result=[]
	for(let i=0;i<user.Business_Plans_Offered.length;i++)
		if(user.Business_Plans_Offered[i]!=Plan)
			result.push(user.Business_Plans_Offered[i])
	await user.updateOne({'Business_Plans_Offered':result})
	res.json({msg:'OK'})
});
//Admin	
router.get('/valid/notyet',passport.authenticate('jwt', {session: false}),async(req,res)=>{
	if(req.user.User_Category!="Admin")
		res.status(401).send("Unauthorized")
	
	const X=await User.find()
	const result=[]
	for(let i=0;i<X.length;i++)
		if(X[i].Valid!=true)
			result.push(X[i])	
	
	res.json({Data:result})
})
//Member-Partner-Consultancy
router.get('/past/projects/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
	const user =await User.findOne({"_id":req.params.id})
	const result=[]
	for(let i=0;i<user.Past_Projects.length;i++){
		const p=await Project.findOne({"_id":user.Past_Projects[i]})
		result.push(p)
	}
	
	
	res.json({data:result})
})			 
 
	
				


	


module.exports = router;