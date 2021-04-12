const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.token ? req.token : req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            //for (let i = 0; i < roles.length; i++) {
                if (role.name === "admin") {
                    next();
                    return;
                }
            //}

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isDistributor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            //for (let i = 0; i < roles.length; i++) {
                if (role.name === "distributor") {
                    next();
                    return;
                }
            //}

            res.status(403).send({
                message: "Require Distributor Role!"
            });
            return;
        });
    });
};

isDistributorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
                if (role.name === "distributor" || role.name === "admin") {
                    next();
                    return;
                }
            res.status(403).send({
                message: "Not authorized!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isDistributor: isDistributor
};
module.exports = authJwt;