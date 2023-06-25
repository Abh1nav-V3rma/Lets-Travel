const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");

mongoose.connect(
    `mongodb+srv://Prometheus:<password>@cluster0.4ap87mt.mongodb.net/?retryWrites=true&w=majority`,
    
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("MongoDB connected...");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));

if(process.env.NODE_ENV === "production"){

    app.use(exress.static("clients/build"));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`Server Running at ${port}`)
});