var express = require('express');
var router = express.Router();


var fullf=require('dialogflow-fulfillment');

router.post('/', express.json(), (req,res,next)=>{
    const agent = new fullf.WebhookClient({ request:req, response:res});
    console.log('Webhook Server called');

    function firstIntent(agent){
        agent.add('response from Webhook server');
    }

    var intentMap= new Map();

    intentMap.add('firstIntent',firstIntent);

    agent.handleRequest(intentMap);
})


module.exports= router;
