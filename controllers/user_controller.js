const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const err_msg = require('../messages/err_msg.json')
const succ_msg = require('../messages/succ_msg.json')
const {
    Validator
} = require('node-input-validator');
const bcrypt = require("bcryptjs");

exports.createDistributor = async (req, res) => {
    try {
        let user = JSON.parse(req.body.data);
        let valid = new Validator(user, {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email',
            mobile: 'required',
            password: 'required',
            office_address: 'required',
            home_address: 'required'
        });
        let matched = await valid.check();
        if (!matched) {
            let validatorError = parseValidate(valid.errors);
            return res.status(400).send({
                'message': validatorError
            });
        }
        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            password: bcrypt.hashSync(user.password, 8),
            office_address: user.office_address,
            home_address: user.home_address,

        }
        if (req.file) {
            data.image = req.file.filename;
        }
        if (user.role === 'distributor') {
            let role = await Role.findOne({
                where: {
                    name: user.role
                }
            })
            data.role_id = role.id
            data.created_by = req.userId;
        }
        let userInst = await User.create(data);
        if (!userInst) {
            return res.status(400).send({
                message: err_msg.DIST_NOT_CREATED
            });
        }
        return res.status(200).send({
            data: userInst,
            message: succ_msg.DIST_CREATED
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

exports.createShop = async (req, res) => {
    try {
        let user = JSON.parse(req.body.data);
        let valid = new Validator(user, {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email',
            mobile: 'required',
            password: 'required',
            office_address: 'required',
            home_address: 'required'
        });
        let matched = await valid.check();
        if (!matched) {
            let validatorError = parseValidate(valid.errors);
            return res.status(400).send({
                'message': validatorError
            });
        }
        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            password: bcrypt.hashSync(user.password, 8),
            office_address: user.office_address,
            home_address: user.home_address
        }
        if (req.file) {
            data.image = req.file.filename;
        }
        if (user.role === 'shop') {
            let role = await Role.findOne({
                where: {
                    name: user.role
                }
            })
            data.role_id = role.id
            data.created_by = req.userId;
        }
        let userInst = await User.create(data);
        if (!userInst) {
            return res.status(400).send({
                message: err_msg.SHOP_NOT_CREATED
            });
        }
        return res.status(200).send({
            data: userInst,
            message: succ_msg.SHOP_CREATED
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

exports.getShopUsers = async (req, res) => {
    try {
        let user_id = req.userId;
        let shopUsers = await User.findAll({
            where: {
                created_by: user_id
            },
            include: {
                model: db.role,
                as: "role",
                where: {
                    name: 'shop'
                },
                required: true
            }
        });
        if (!shopUsers) {
            return res.status(400).send({
                message: err_msg.DATA_NOT_FOUND
            });
        }
        return res.status(200).send({
            data: shopUsers,
            message: succ_msg.SHOP_LIST
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        let filter = {};
        if (!filter.where)
            filter.where = {};
        if (req.query.search !== undefined && req.query.search !== "") {
            filter.where = {
                [Op.or]: [{
                        first_name: {
                            [Op.like]: '%' + req.query.search
                        }
                    },
                    {
                        last_name: {
                            [Op.like]: '%' + req.query.search
                        }
                    },
                    {
                        email: {
                            [Op.like]: '%' + req.query.search
                        }
                    }
                ]
            };
        }
        filter.order = [
            ['createdAt', 'DESC']
        ]
        let users = await User.findAll(filter);
        if (!users) {
            return res.status(400).send({
                message: err_msg.DATA_NOT_FOUND
            });
        }
        return res.status(200).send({
            data: users,
            message: succ_msg.USER_LIST
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        });
    }
};