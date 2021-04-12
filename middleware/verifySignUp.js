const db = require("../models");
const ROLE = db.role;
const User = db.user;

checkDuplicateMobileOrEmail = (req, res, next) => {
  // Mobile
  let data = JSON.parse(req.body.data);
  User.findOne({
    where: {
      mobile: data.mobile
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Mobile number is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: data.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    
      if (!ROLE.includes(req.body.role)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.role
        });
        return;
      }
  }
  next();
};

const verifySignUp = {
  checkDuplicateMobileOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
