const express = require('express');
const router = express.Router();
const Rating= require('../../models/Rating');
const User=require('../../models/User');
const passport = require('passport')

router.get('/:id',async(req,res)=>{
  const id=req.params.id
  const X=await Rating.findOne({'_id':id})
  res.json({data:X})
  
});

 router.post('/',passport.authenticate('jwt', {session: false}), async (req,res) => {
     const rating =req.body.rating
     const review=req.body.review
     const project_id=req.body.project_id
     const reviewer_id=""+req.user._id
     const reviewed_id=req.body.reviewed_id
     const R=await Rating.create({
       'rating':rating,
       'review':review,
       'project_id':project_id,
       'reviewer_id':reviewer_id,
       'reviewed_id':reviewed_id
     })
     const user=await User.findOne({'_id':reviewed_id})
    
     (user.Ratings).push(R._id)
     await user.updateOne({'Ratings':user.Ratings})
     const count=0
     const user2=await User.findOne({'_id':reviewed_id})
     for(let i=0;i<user2.Ratings.length;i++){
          const Y=Rating.findOne({'_id':user2.Ratings[i]})
          count+=Y.rating
     }
     const avg=count/user2.Ratings.length
     await user2.updateOne({'Avg_Rating':avg})
    
     res.json({msg:'OK'})
	
	})
  
router.delete('/:id',passport.authenticate('jwt', {session: false}), async (req,res) => {
    const S=await Rating.findOne({'_id':req.params.id})
    const user=await User.findOne({'_id':S.reviewed_id})
    if(req.user.User_Category!="Admin"||(""+req.user._id)!=S.reviewer_id)
        return res.status(401).send('Unauthorized');
    const result=[]
    for(let i=0;i<user.Ratings.length;i++)
      if(user.Ratings[i]!=req.params.id)
          result.push(user.Ratings[i]) 
    await user.updateOne({'Ratings':result})
    await Rating.findOneAndRemove({'_id':req.params.id})
    const Y=await User.findOne({"_id":S.reviewed_id})
    const count=0
     for(let i=0;i<Y.Ratings.length;i++){
        const k=await Rating.findOne({"_id":Y.Ratings[i]})    
        count+=k.rating
     }
     const avg=count/Y.Ratings.length
     await Y.updateOne({'Avg_Rating':avg})
       
 })
 module.exports = router;
 