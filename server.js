const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const app = express()
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('./models/subscribers_model');
require('./models/Notification');
const index = require('./router');
const push = require('./router/push');

// subscriber route load
const subscribe = require('./router/subscribe');
// Load Keys
const db = require('./config/keys').mongoURI
//Handlebars Helpers
// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;

mongoose
    .connect(db, { useNewUrlParser: true } )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(passport.initialize());
require('./config/passport')(passport);

const reservations = require('./routes/api/reservations')
const locations = require('./routes/api/locations')
const projects = require('./routes/api/projects')
const ratings = require('./routes/api/ratings')
const skills = require('./routes/api/skills')
const tasks = require('./routes/api/tasks')
const users=require('./routes/api/users')
const rooms=require('./routes/api/rooms')
app.use('/api/reservations',reservations)
app.use('/api/locations',locations)
app.use('/api/projects',projects)
app.use('/api/ratings',ratings)
app.use('/api/skills',skills)
app.use('/api/tasks',tasks)
app.use('/api/users',users)
app.use('/api/rooms',rooms)




// //Notifications plus nodemailer
// app.set('trust proxy', true);
// // parse application/json
// app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use('/public', express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));

// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));
// // app.set('views', __dirname + '/public/js');

// // Set global vars
// app.use((req, res, next) => {
//     res.locals.user = req.user || null;
//     next();
// });
// app.use('/', index);
// app.use('/subscribe', subscribe);
// app.use('/push', push);
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.use(express.static(path.join(__dirname,'client/build')));

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get('*',(req,res)=>{
        res.sendfile(path.join(__dirname='client/build/index.html'));
    })
}
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'))
})




// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = process.env.PORT ||3000
app.listen(port, (req,res) => {console.log(`Server up and running on port ${port}`)
})
