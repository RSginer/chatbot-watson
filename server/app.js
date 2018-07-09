var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var watson = {
  workspaceId: process.env.WATSON_WORKSPACE,
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD
}
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

app.use(bodyParser.json({ limit: '500mb' }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Set up Assistant service wrapper.
var service = new AssistantV1({
  username: watson.username, // replace with service username
  password: watson.password, // replace with service password
  version: '2018-02-16'
});

var workspace_id = watson.workspaceId; // replace with workspace ID

// Start conversation with empty message.
/* service.message({
  workspace_id: workspace_id
}, processResponse);
 */

let lastResponseContext;

app.post('/start', function (req, res) {
  service.message({
    workspace_id: workspace_id
  }, function (err, response) {
    if (err) {
      //     console.error(err); // something went wrong
      return res.send(err);
    }

    lastResponseContext = response.context;

    // If an intent was detected, log it out to the console.
    if (response.intents.length > 0) {
      console.log('Detected intent: #' + response.intents[0].intent);
    }

    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
      return res.send({ text: response.output.text[0] })
    }

  });
});


app.post('/', function (req, res) {
  const message = req.body.message;
  console.log(message)
  const watsonReq = {
    workspace_id: workspace_id,
    input: { text: message },
  };

  watsonReq['context'] = lastResponseContext


  service.message(watsonReq, function (err, response) {
    if (err) {
      //     console.error(err); // something went wrong
      return res.send(err);
    }

    lastResponseContext = response.context;

    // If an intent was detected, log it out to the console.
    if (response.intents.length > 0) {
      console.log('Detected intent: #' + response.intents[0].intent);
    }

    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
      return res.send({ text: response.output.text[0] })
    }

  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function processResponse() {
}