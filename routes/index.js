var express = require('express');
var router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
//const config= require('../keys.json');
// const sessionClient = new dialogflow.SessionsClient({
//   keyFilename:'G:/KinProject/nodeProjects/keys.json'
// });



// const projectId = 'test1-gvnrcx';
// //console.log(config.project_id);
// const sessionId = '123456';
// const languageCode = 'en';
// const queries = [
//    'demo',
//   // 'Next monday at 3pm for 1 hour, please', // Tell the bot when the meeting is taking place
//   // 'B'  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
// ];

      /* GET home page. */
    router.get('/', function(req, res, next) {

      runSample('test1-gvnrcx').then(response=>{
        res.send({"data": response})
      });
      
    });

    async function runSample(projectId) {
      // A unique identifier for the given session
      const sessionId = '12345';
    
      // Create a new session
      const sessionClient = new dialogflow.SessionsClient({keyFilename:'G:/KinProject/nodeProjects/keys.json'});
      const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    
      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: 'demo',
            // The language used by the client (en-US)
            languageCode: 'en-US',
          },
        },
      };
    
      // Send request and log result
      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }

      return result;
    }

      







module.exports = router;
