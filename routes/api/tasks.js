const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Task = require('../../models/Task');
const Skill=require('../../models/Skill');
const User=require('../../models/User');
const validator = require('../../validations/taskValidations')
const passport = require('passport')

//,passport.authenticate('jwt', {session: false})
// return res.status(401).send('Unauthorized');
//cruds
router.get('/',passport.authenticate('jwt', {session: false}),async  (req, res) => {
    const Tasks= await Task.find();
    res.json({ data: Tasks})
    })

router.get('/:id',passport.authenticate('jwt', {session: false}),async (req,res)=> {
    const tid = req.params.id
	const X =await Task.findOne({"_id":tid})
	if(!X)
        return res.status(404).send({error: 'Task does not exist'})
    X.Consultancy_id=await User.findOne({"_id":X.Consultancy_id},{"Hashed_password":0})
    X.Partner_id=await User.findOne({"_id":X.Partner_id},{"Hashed_password":0})
    X.member_id=await User.findOne({"_id":X.member_id},{"Hashed_password":0})
    X.main_skill=await Skill.findOne({"_id":X.main_skill})
    X.project_id=await Project.findOne({"_id":X.project_id})
    const result1=[]
    const result2=[]
    for(let i=0;i<X.current_members_applied_ids.length;i++){
        const u = await User.findOne({"_id":X.current_members_applied_ids[i]})
        result1.push(u)
    }
    for(let i=0;i<X.extra_skills.length;i++){
        const s= await Skill.findOne({"_id":X.extra_skills[i]})
        result2.push(s)
    }
    X.current_members_applied_ids=result1
    X.extra_skills=result2
    res.json({data:X})

})

router.post('/',passport.authenticate('jwt', {session: false}),async (req, res) => {
    if(req.user.User_Category!="Admin"&& req.user.User_Category!="Partner"&&req.user.User_Category!="Consulting_Agent")
        res.status(401).send("Unauthorized")
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) 
        return res.status(400).send({ error: isValidated.error.details[0].message })
    const Y=await Skill.findOne({'_id':req.body.main_skill})
    if(!Y)
        return res.status(400).send({error: 'We dont support that skill in LirtenHub'})
    const X= await Task.create(req.body)

    const z=await Project.findOne({'_id':X.project_id})
    if(z.members_needed==z.tasks.length){
        await z.updateOne({"members_needed":z.members_needed+1})
    }
    const result=z.tasks
    result.push(X.id)
    await z.updateOne({'tasks':result})

	return res.json({msg:'Task was Posted successfully', data: X});
});
router.delete('/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    try {
        const tid = req.params.id
        const X = await Task.findOne({'_id':id})
        if(!X){
            return res.status(404).send({error: 'Task does not exist'})}
        if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
            return res.status(401).send("Unauthorized")
        if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
            return res.status(400).send({error: 'The Task cannot be Deleted anymore'})
        }
        const deletedT = await Task.findByIdAndRemove(tid)

        const P=Project.findOne({'_id':X.project_id})
        const result=[]
        for(let i=0;i<P.tasks.length;i++){
            if(P.tasks[i]!=tid)
                result.push(P.tasks[i])
        }
        await P.updateOne({"tasks":result})
        res.json({msg:'Task was deleted successfully', data: deletedT})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
})
router.put('/:id',passport.authenticate('jwt', {session: false}), async(req, res) => { 
    const tid = req.params.id 
    const X = await Task.findOne({"_id":tid})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if(!X)
        return res.status(404).send({error: 'Task does not exist'})
    if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
        return res.status(400).send({error: 'The Task cannot be edited anymore'})
    }
    const isValidated = validator.UpdateValidation(req.body)
    if (isValidated.error) 
        return res.status(400).send({ error: isValidated.error.details[0].message })
        const Y=await Skill.findOne({'_id':req.body.main_skill})
    
    if(req.body.main_skill!=null&&!Y)
        return res.status(400).send({error: 'We dont support that skill in lirten'})
    
    const updatedT = await X.updateOne(req.body)
    res.json({msg: "Task Updated Succsefully",data:updatedT})
})
router.put('/addSkill/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
	const tid=req.params.id
	const X = await Task.findOne({'_id':tid})
    if(!X)
        return res.status(404).send({error: 'Task does not exist'})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
        return res.status(400).send({error: 'The Task cannot be edited anymore'})
    }
    const isValidated = validator.addskill(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const Y=await Skill.findOne({'_id':req.body.Skill})
    if(!Y)
        return res.status(400).send({error: 'We dont support that skill in lirten'})
    X.extra_skills.push(req.body.Skill)
    const updatedP=await X.updateOne({"extra_skills":X.extra_skills})
    res.json({msg: 'Skill Added successfully'})
})

router.put('/addattrib/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
	 const tid=req.params.id
     const X = await Task.findOne({'_id':tid})
    if(!X)
    return res.status(404).send({error: 'Project does not exist'})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
        return res.status(400).send({error: 'The Task cannot be edited anymore'})
    }
    const isValidated = validator.addattribute(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    X.extra_attributes.push(req.body.attribute)
    await X.updateOne({"extra_attributes":X.extra_attributes})
    res.json({msg: 'Attribute Added successfully'})
})

router.delete('/delskill/:id',passport.authenticate('jwt', {session: false}),async (req, res) => {
    const tid=req.params.id
	const X = await Task.findOne({"_id":tid})
    if(!X)
    return res.status(404).send({error: 'Project does not exist'})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
        return res.status(400).send({error: 'The Task cannot be edited anymore'})
    }
    const isValidated = validator.addskill(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    var result=[]
    
    for(var i=0;i<(X.extra_skills).length;i++){
        if((X.extra_skills)[i]!=req.body.Skill)
            result.push((X.extra_skills)[i])
    }
    
    const updatedP=await X.updateOne({"extra_skills":result})
    res.json({msg: 'Skill Deleted successfully'})
})
router.delete('/delattrib/:id',passport.authenticate('jwt', {session: false}),async (req, res) => {
    const pid=req.params.id
	const X = await Project.findOne({"_id":pid})
    if(!X)
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if((X.status=='Implementation'||X.status=='Completed')&&req.user.User_Category!="Admin"){
        return res.status(400).send({error: 'The Task cannot be edited anymore'})
    }
    const isValidated = validator.addattribute(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    var result=[]
    
    for(var i=0;i<(X.extra_attributes).length;i++){
        if((X.extra_attributes)[i]!=req.body.attribute)
            result.push((X.extra_attributes)[i])
    }
    const updatedP=await X.updateOne({"extra_attributes":result})
    res.json({msg: 'Attribute Deleted successfully'})
})
router.put('/status/:id',passport.authenticate('jwt', {session: false}),async (req, res) => {
    const tid = req.params.id 
    const X = await Task.findOne({'_id':tid})
     if(!X)
     return res.status(404).send({error: 'Task does not exist'})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=Consultancy_id)
        return res.status(401).send("Unauthorized")
     
     
     if(X.status=='Completed'&&req.user.User_Category!="Admin"){
         return res.status(400).send({error: 'The Project Has Been Completed Already'})
     }
     const isValidated = validator.updateValidationstatus(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     await X.updateOne(req.body)
     if(req.body.status=='Implementation'){
         await X.updateOne({"Start_Date":new Date()})}
     else if(req.body.status=='Completed'){
         await X.updateOne({"End_Date":new Date()})          
            //  const Y=await User.findOne({"_id":X.member_id})        
            //  const result=Y.Past_Projects           
            //  result.push(X._id);
            //  await Y.updateOne({"Past_Projects":result})
         
     }
     res.json({msg: 'Task updated successfully'})
 })
// cruds done

router.put('/assign/:id',passport.authenticate('jwt', {session: false}),async (req,res)=>{
    const tid=req.params.id
    const memberid=req.body.memberid
    const X= await Task.findOne({"_id":tid})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.id)!=X.Consultancy_id)
        return res.status(401).send("Unauthorized")
    if(X.member_id!=null&&req.user.User_Category!="Admin")
        return res.status(404).send({error: 'There is Already a Member Assigned to the Task'})
    await X.updateOne({'member_id':memberid })
    await X.updateOne({"Start_Date":new Date()})
    await X.updateOne({"status":"Implementation"})
    const z=await Project.findOne({"_id":X.project_id})
    const result=[]
    for(let i=0;i<z.current_members_applied_ids.length;i++){
        if(!X.current_members_applied_ids.includes(z.current_members_applied_ids[i]))
            result.push(z.current_members_applied_ids[i])
    }
    await z.updateOne({"current_members_applied_ids":result})
    const r1=z.accepted_members_ids
    r1.push(memberid)
    await z.updateOne({"accepted_members_ids":r1})
    await z.updateOne({"current_members_count":z.current_members_count+1})
    await X.updateOne({"current_members_applied_ids":[]})
    res.json({msg: 'Member is now Assigned to the Task'})

})
router.put('/apply/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    const tid=req.params.tid
    const memberid=req.body.memberid
    const X= await Task.findOne({"_id":tid})
    if(req.user.User_Category!="Admin"&&(""+req.user.id)!=X.Partner_id&&(""+req.user.Consultancy_id)!=req.user.id)
        res.status(401).send("Unauthorized")
    if(X.member_id!=null)
        return res.status(404).send({error: 'Someone else is Already working on the Task'})
    const result=X.current_members_applied_ids
    result.push(memberid) 
    await X.updateOne({"current_members_applied_ids":result})
    const p=await Project.findOne({"_id":X.project_id})
    const result1=p.current_members_applied_ids
    result1.push(member_id)
    await p.updateOne({"current_members_applied_ids":result1})

    res.json({msg:'Your requesnt to work on the Task has been submitted'})
})

router.put('/declinemember/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{
    const tid=req.params.id
    const memberid=req.body.memberid
    const X=await Task.findOne({'_id':tid})
    if(req.user.User_Category!="Admin"&&(""+req.user.id!=X.Partner_id)&&(""+req.user.id)!=X.Consultancy_id)
        res.status(401).send("Unauthorized")
    result=[]
    for(let i=0;i<X.current_members_applied_ids.length;i++){
        if(X.current_members_applied_ids[i]!=memberid)
            result.push(X.current_members_applied_ids[i])
    }
    const p=await Project.findOne({"_id":X.project_id})
    const result1=[]
    for(let i=0;i<p.current_members_applied_ids.length;i++){
        if(p.current_members_applied_ids[i]!=memberid){
            result1.push(p.current_members_applied_ids[i])
        }
    }
    await p.updateOne({"current_members_applied_ids":result1})
    await X.updateOne({"current_members_applied_ids":result})
    res.json({msg:'membere was declined sucessfully'})
})

router.post('/certified/:id',passport.authenticate('jwt', {session: false}),async(req,res)=>{ // check 3aleh tany
    const tid=req.params.id
    const mem_id=req.user.id

    if(req.user.User_Category!="Member")
        res.json({data:false})

    const X=await Task.findOne({"_id":tid})
    const Y=await User.findOne({"_id":mem_id})
    
    if(Y.Skills.length==0)
        res.json({data:false})
    
    if(!(Y.Skills.includes(X.main_skill)))
        res.json({data:false})

    for(let i=0;i<X.extra_skills.length;i++){
        if(!(Y.Skills.includes(X.extra_skills[i]))){
            res.json({data:false})
        }
    }
    res.json({data:true})
    
})


// router.get('/View/mytasks',passport.authenticate('jwt', {session: false}),async(req,res)=>{
//     const id=req.body.id
//     const X=await Task.find()
//     result=[]
//     for(let i=0;i<X.length;i++){
//         if(X[i].member_id==id)
//             result.push(X[i])
//     }
//     res.json({data:result})
// })
module.exports=router
