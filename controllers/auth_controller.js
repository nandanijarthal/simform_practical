const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const tokenService = require('../services/tokenService')
const err_msg = require('../messages/err_msg.json')
const succ_msg = require('../messages/succ_msg.json')
const {
  Validator
} = require('node-input-validator');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.adminSignup = async (req, res) => {
  try {
    let valid = new Validator(req.body, {
      first_name: 'required',
      last_name: 'required',
      mobile: 'required',
      email: 'required|email',
      office_address: 'required',
      home_address: 'required',
      password: 'required',
      role: 'required'
    });
    let matched = await valid.check();
    if (!matched) {
      let validatorError = parseValidate(valid.errors);
      return res.status(400).send({
        'message': validatorError
      });
    }
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: bcrypt.hashSync(req.body.password, 8),
      office_address: req.body.office_address,
      home_address: req.body.home_address
    }
    if (req.body.role === 'admin') {
      let role = await Role.findOne({
        where: {
          name: req.body.role
        }
      })
      data.role_id = role.id
    }
    let user = await User.create(data);
    if (!user) {
      return res.status(400).send({
        message: err_msg.USER_NOT_CREATED
      });
    }
    return res.status(200).send({
      data: user,
      message: succ_msg.USER_CREATED
    })
  } catch (e) {
    return res.status(500).send({
      message: e.message
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    let valid = new Validator(req.body, {
      email: 'required|email',
      password: 'required'
    });
    let matched = await valid.check();
    if (!matched) {
      let validatorError = parseValidate(valid.errors);
      return res.status(400).send({
        'message': validatorError
      });
    }
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.status(400).send({
        message: err_msg.USER_NOT_FOUND
      });
    }
    if (user.deletedAt !== null) {
      return res.status(400).send({
        message: err_msg.ALREADY_DELETED
      });
    }
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
      return res.status(400).send({
        "message": err_msg.INVALID_LOGIN
      });
    }
    var token = await tokenService.createJwtToken(user.id)
    return res.status(200).send({
      data: user,
      access_token: token,
      message: succ_msg.LOGIN_SUCCESS
    })

  } catch (e) {
    return res.status(500).send({
      message: e.message
    });
  }
}