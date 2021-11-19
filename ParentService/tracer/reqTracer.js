
const initJaegerTracer = require('jaeger-client').initTracer

// intialize jaeger client

function initTracer () {
 
const config = {
    serviceName: "ParentService",
    reporter: {
        agentHost: '',
        agentPort:  6832,
        logSpan: true,
    },
    sampler: {
        type: "const",
        param: 1,
    },
};
const options = {
    tags: {
        "ParentService": "1.0.0",
    }

};

  return initJaegerTracer(config,options);

}


module.exports ={ initTracer };
