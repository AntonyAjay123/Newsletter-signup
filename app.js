//jshint esversion:6

const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require('body-parser');
const request= require('request');

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
  console.log("reached");
  let fName=req.body.firstName;
  let lName=req.body.lastName;
  let email=req.body.email;
  let user={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fName,
          LNAME:lName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(user);
  const url="https://us14.api.mailchimp.com/3.0/lists/bef8672d33";
  const options={
    method:"POST",
    auth:"antonyAjay123:e0cba9cb6cae891057acb3cb5cbfd197-us14"
  };
  const request=https.request(url,options,function(response){
    if(response.statusCode==200)
    res.sendFile(__dirname+"/success.html");
    else
    res.sendFile(__dirname+"/failure.html");
    response.on("data",function(data){
      console.log("reachedhere");
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

//e0cba9cb6cae891057acb3cb5cbfd197-us14
//unique id:bef8672d33
