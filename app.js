/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error(err));

// Middleware for parsing URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer storage configuration
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

// Route to display form and uploaded images
app.get('/', (req, res) => {
    imgSchema.find({})
        .then((data) => {
            res.render('imagepage', { items: data })
        })
        .catch(err => console.error(err));
});

// Route to handle image upload
app.post('/', upload.single('image'), (req, res, next) => {
    var obj = {
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        seller_name: req.body.seller_name,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    };
    imgSchema.create(obj)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.error(err));
});

// Set up the server to listen on a port
var port = process.env.PORT || '3000';
app.listen(port, err => {
    if (err)
        throw err;
    console.log('Server listening on port', port);
});
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error(err));

// Middleware for parsing URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer storage configuration
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

// Route to display form and uploaded images
app.get('/', (req, res) => {
    imgSchema.find({})
        .then((data) => {
            res.render('imagepage', { items: data })
        })
        .catch(err => console.error(err));
});

// Route to handle image upload
app.post('/', upload.single('image'), (req, res, next) => {
    let obj = {
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        seller_name: req.body.seller_name
    };

    // Check if an image was uploaded
    if (req.file) {
        obj.img = {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        };
    }

    imgSchema.create(obj)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.error(err));
});

// Set up the server to listen on a port
var port = process.env.PORT || '3000';
app.listen(port, err => {
    if (err)
        throw err;
    console.log('Server listening on port', port);
});
