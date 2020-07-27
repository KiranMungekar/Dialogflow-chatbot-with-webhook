var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const keysFile=require('../keys.json');

const dialogflow = require('@google-cloud/dialogflow');



      /* GET home page. */
    router.get('/', function(req, res, next) {

      runSample().then(response=>{
        res.send({"data": response})
      });
      
    });

    async function runSample() {
      // A unique identifier for the given session
      const sessionId =uuidv4();
      const projectId=keysFile.project_id;
      // Create a new session
     // const keys= JSON.parse(fs.readFileSync('G:/KinProject/nodeProjects/keys.json','utf8'));
      //console.log(keys.type);
      //keys.
    //  console.log(process.env.DIALOGFLOW_CLIENT_EMAIL);
      const privateKey = keysFile.private_key;
      const clientEmail =  keysFile.client_email;
     
      const config = {        
        credentials:{
          client_email: clientEmail,
          private_key: privateKey
        }
      }
     

      const sessionClient = new dialogflow.SessionsClient(config);
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
