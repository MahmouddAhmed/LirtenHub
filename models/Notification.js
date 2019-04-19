const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    title: {type:String,
         required: true},
    keys: Schema.Types.Mixed,
    createDate: {
       type: Date,
       default: Date.now
   },
   url: String,
   message: String,

});

mongoose.model('Notifications', NotificationSchema, 'Notification');