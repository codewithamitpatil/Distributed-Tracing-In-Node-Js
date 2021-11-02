
const express = require('express');

/* 
 this two packages need for 
 distributed tracing with jaeger
*/
const bent = require('bent');
const opentracing = require('opentracing');


// importing tracing middleware
const { initTracer } = require("./tracer/reqTracer");

const port = 3000;

const app = express();

/*
 intialize global tracer ,
 so we can use this
 in our controller.
*/
const tracer = initTracer();
opentracing.initGlobalTracer(tracer);


// intialize tracing middleware
require('./tracer/tracer')(app);




app.get('',async(req,res)=>{

  // create span
  const span = tracer.startSpan('say-hello', { childOf: req.span })
  // create log 
  span.log({ event: 'name', message: `this is a log message for name ` })
  
  /* 
  To inject incoming heders to 
  child service , so child 
  service tracing  middleware 
  exctract this headers.
  */
  const headers = {}
  tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers)
  
  /* 
  bent is request packege , just like
  fetch or axio , so i can make an http
  call to child service and get some 
  response
  */
  const request = bent('string', headers)
  const response = await request('http://localhost:4000/a4');

  span.setTag('response', response);
  span.finish()
  res.send(response);


});



// start server
app.listen(port,()=>{
   console.log('server running');
});