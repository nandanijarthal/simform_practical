const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../models");
const Role = db.role;
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const app = express();
const bearerToken = require('express-bearer-token');

db.sequelize.sync({}).then(() => {
  initial();
});

function initial() {
  Role.count((err, count) => {
    if (!err && count === 0) {
      Role.create({ id: 1, name: "admin" })
      Role.create({  id: 2,  name: "distributor"})
      Role.create({  id: 3,  name: "shop"})
      .then(function(role) {
        console.log('Roles added');
    })
    .catch(function(err) {
        console.log(err)
    });
    }
  })
  
}
var corsOptions = {
  origin: "http://localhost:3005"
};

app.use(cors(corsOptions));
app.use(bearerToken());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to demo application" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});