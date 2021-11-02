
const express = require('express');

const port = 4000;


const app = express();

// import tracer
require('./tracer/tracer')(app);



/* 

this is the end point which called 
by parent service to recive some 
data .


*/

app.get('/a4',async(req,res)=>{
  
  const data ={
    name:"amit patil",
    age:21
  };
  res.send(data);

});
// start server
app.listen(port,()=>{
   console.log('server running 4000');
});