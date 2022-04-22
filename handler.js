const twilioConfig = require("./twilioConfig.json");
const twilio = require("twilio");
const accountSid = twilioConfig.accountSid; // Your Account SID from www.twilio.com/console
const authToken = twilioConfig.authToken; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

module.exports.receive = async (event) => {
  var message = new URLSearchParams(event.body);
  const twiml = new twilio.twiml.MessagingResponse();
  console.log("event === " + JSON.stringify(event));
  twiml.message("You sent this message:" + message.get("Body"));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/xml",
    },
    body: twiml.toString(),
  };
};

module.exports.sendSms = async (event) => {
  console.log("event.body === " + event);
  console.log("event.body ======== " + event.body);
  var data = JSON.parse(event.body);
  console.log("data = " + data.message);
  console.log("data = " + data.phone);
  try {
    const message = await client.messages.create({
      from: "+19378216536",
      to: data.phone,
      body: data.message,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(message),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(error),
    };
  }
};

// module.exports.test = async (event) => {
//   var foo =
//     "{message: \"ffffff\", phone: \"+5102904236\"}";
//   var params2 = JSON.parse(foo)
//   // console.log(params2);
//   console.log(params2);
// };
