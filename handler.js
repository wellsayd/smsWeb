const twilioConfig = require("./twilioConfig.json");
const twilio = require("twilio");
const accountSid = twilioConfig.accountSid; // Your Account SID from www.twilio.com/console
const authToken = twilioConfig.authToken; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB();
const headersObj = {
  // "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

module.exports.receive = async (event) => {
  var message = new URLSearchParams(event.body);
  const twiml = new twilio.twiml.MessagingResponse();

  try {
    await dynamoDb
      .putItem({
        TableName: "SMSmessage",
        Item: {
          phone: { S: message.get("From") },
          message: { S: message.get("Body") },
        },
      })
      .promise();
  } catch (error) {
    // console.log("error ==== " + error);
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/xml",
    },
    body: twiml.toString(),
  };
};

module.exports.sendSms = async (event) => {
  try {
    var data = JSON.parse(event.body);
  } catch (error) {
    headersObj["Content-Type"] = "application/json";
    return {
      statusCode: 500,
      headers: headersObj,
      body: JSON.stringify(error),
    };
  }

  var response;
  try {
    response = await client.messages.create({
      from: "+19378216536",
      to: data.phone,
      body: data.message,
    });
  } catch (error) {
    response = error;
  }

  headersObj["Content-Type"] = "application/json";

  return {
    statusCode: response.status === "queued" ? 200 : response.status,
    headers: headersObj,
    body: JSON.stringify(response),
  };
};
