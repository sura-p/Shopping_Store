import express from 'express'


const app = express();
app.get("/",(req,res)=>{
    res.send("API is running");
});

app.listen(5000,console.log("server running ..."));