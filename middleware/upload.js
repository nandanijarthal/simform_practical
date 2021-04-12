const multer = require('multer');
const fs = require('fs');

exports.uploadFiles = function (req, res, next) {

    let path = './images';

    // create dir if not exist
    fs.existsSync(path) || fs.mkdirSync(path);

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);

        }
    });

    let upload = multer({
        storage: storage
    }).single('image');
    //let upload = multer({ storage: storage }).array('image', 10);

    upload(req, res, function (err) {
        if (err) {
            errorsHandler.handle(500, err, res);
            return;
        }
        next();
    });
};