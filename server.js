const express=require("express");
const mysql=require("mysql")
const bodyParser = require('body-parser');
const cors=require("cors")
const app=express()
const mongoose = require("mongoose");
app.use(bodyParser.json());

const adminRoute =require("./rootes/Admin");
//mongo db database connection

mongoose
  .connect("mongodb://0.0.0.0:27017/QUERIES")
  .then(console.log("connectd sunccesfu lly"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

//sql database connections
const db1=mysql.createConnection({
    host :"localhost",
    user: "root",
    password:"Amma41664@",
    database:"sailor"

})
app.get('/',(re,res)=>{
    return res.json("FROM BACKEND SIDE");
})
app.post('/api/sendData', (req, res) => {
    const { value,correctanswer } = req.body;
    console.log(value);
    console.log(correctanswer);
    console.log('Received data from frontend:', value);
  
  //comparing two strings
    const sql2=correctanswer;
    const sql3=value;
    console.log(sql3);
    db1.query(sql2,(err,data1)=>{
    if(err) return(res.json(err.message));
    else 
     db1.query(sql3,(err,data2)=>{
    if(err)return(res.json({success : err.message}));
    else{
       
        try{
            console.log(JSON.stringify(data2))
            if(JSON.stringify(data1) ===JSON.stringify(data2))
            {
                console.log('true');
                res.json({ success: "correct answer", message: 'Data received successfully' });
            }
            else{
                
                res.json({ success: "wrong answer", message: 'Data received successfully' });
                console.log('false');
            }
           
        }
        catch(err)
        {
            console.log('true');
           
        }
      
    }
    })
})

});

app.use("/api/admin",adminRoute);
app.listen(3000,()=>{
    console.log("listening ");
})