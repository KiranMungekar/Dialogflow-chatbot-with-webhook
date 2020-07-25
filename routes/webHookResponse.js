var express = require('express');
var router = express.Router();


var fullf=require('dialogflow-fulfillment');




router.post('/', express.json(), (req,res,next)=>{

    const agent = new fullf.WebhookClient({ request:req, response:res});
    console.log('Webhook Server called');

    function firstIntent(agent){
        try{
            agent.add('response from Webhook  for first Intent');
        }catch(err){
            console.log(err);
        }
       
    }

    function secondIntent(agent){
        try{
            agent.add('response from Webhook server for second Intent');
        }catch(err){
            console.log(err);
        }
    }

    var intentMap= new Map();

    intentMap.set('firstIntent',firstIntent);
    intentMap.set('secondIntent',secondIntent);
    

    agent.handleRequest(intentMap);
})


module.exports= router;
