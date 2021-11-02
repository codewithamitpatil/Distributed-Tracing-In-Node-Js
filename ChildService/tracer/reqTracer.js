// intialize jaeger client 

const initJaegerTracer = require('jaeger-client').initTracer


function initTracer () {
 
const config = {
    serviceName: "ChildService",
    reporter: {
        agentHost: '13.232.103.57',
        agentPort:  6832,
        logSpan: true,
    },
    sampler: {
        type: "const",
        param: 0,
    },
};
const options = {
    tags: {
        "ChildService": "v.0.1",
    }

};

  return initJaegerTracer(config,options);

}


module.exports ={ initTracer } ;
