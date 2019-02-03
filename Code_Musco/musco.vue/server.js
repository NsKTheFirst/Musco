const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const api = require(__dirname + "/api");
// *********************************************
// Pour l'upload
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "src/assets/Avatars/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })

app.post("/upload", upload.array("uploader"), function(req, res) {
    console.log('upload request (files)', req.files)
    res.send("walou")
});

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.setHeader("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin , X-Requested-With, x-authenticate,Content-Type, Accept");
//     next();
// });

// *********************************
app.use(cors());

app.use(express.json({extended : false}));
app.use(api.prefix, api.routers);

app.listen(port, () => console.log(`Listening on port ${port}`));