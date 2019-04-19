const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(cors())




// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BIBNUqwHX5pL-t0nASwI55i_72AWzV8mK399XT1DUPEN0v08TW691jzn0VT90nuHV6tmdo6VdnWkQwExAMUdIhU";
const privateVapidKey = "GnrCccFbAuWfjfjG-HqHw6nQZK_77pK2JQB7Y9owKHo";

webpush.setVapidDetails(
  "mailto:mado@x.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "New Notification" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});



//const port = 5000
//app.listen(port, () => console.log(`Server up and running on port ${port}`))