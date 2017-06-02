var express = require("express");
var app = express();
var bodyParser  = require("body-parser");

var paper = require("paper");
var thisTime = "circles";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get(
    "/", 
    function(req, res)
    {
        res.render(thisTime);
    }
);

// app.post(
//     "/",
//     function(req, res)
//     {
//         var rows = req.body.nRows;
//         var seconds = req.body.nSeconds;
//         var animate = req.body.animate;
//         var change = req.body.change;
//         console.log("post route " + rows);
//         console.log("animate " + animate);
//         console.log("change " + change);
//         console.log("seconds " + seconds);
//         res.redirect("/");
//     }  // end function()
// );  // end app.post()

app.listen(
    process.env.PORT, 
    process.env.IP, 
    function()
    {
        console.log(thisTime + " Exercise Started!");
    }
);

// Prototype Board :)

