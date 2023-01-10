const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");




const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscibed",
        merge_filed: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }


  const url = "https://us21.api.mailchimp.com/3.0/lists/850839676cs";

  const Option = {
    method: "POST",
    auth: "walid1:485ce2d999a7dfa271be2df415b58489-us21",
  }

  const jsonData = JSON.stringify(data);


  https.request(url, Option, function(response){

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })

 


})

app.listen(PORT, function(){
    console.log("server is running on server port 5000");
});


//api key 485ce2d999a7dfa271be2df415b58489-us21
//850839676cs
