import { twilioConfig } from "./twilioConfig";

const twilio = require("twilio");
const accountSid = "AC9059c3ab167a3c0ace9cf3f0c5dd17ca"; // Your Account SID from www.twilio.com/console
const authToken = "751cce1746d7ae3e3a3b9e1663ad9a59"; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

module.exports.receive = async (event, context, cb) => {
  console.log("event = " + JSON.stringify(event));
  var message = new URLSearchParams(event.body);
  console.log("message ================== " + message.get("Body"));
  const twiml = new twilio.twiml.MessagingResponse();

  twiml.message("You sent this message:" + message.get("Body"));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/xml",
    },
    body: twiml.toString(),
  };
};

module.exports.sendSms = async (event, context, cb) => {
  // console.log("event = " + JSON.stringify(event));
  // var message = new URLSearchParams(event.body);
  // console.log("message ================== " + message.get("Body"));
  // const twiml = new MessagingResponse();
  // twiml.message("You sent this message:" + message.get("Body"));
  // return {
  //   statusCode: 200,
  //   headers: {
  //     "Content-Type": "text/xml",
  //   },
  //   body: twiml.toString(),
  // };

  console.log("send sms");
};
// module.exports.test = async (event) => {
//   var foo =
//     "ToCountry=US&ToState=OH&SmsMessageSid=SMd0e963c963d6e4b42947da3c95713970&NumMedia=0&ToCity=WOOSTER&FromZip=23708&SmsSid=SMd0e963c963d6e4b42947da3c95713970&FromState=VA&SmsStatus=received&FromCity=NORFOLK&Body=Test&FromCountry=US&To=%2B19378216536&ToZip=44691&NumSegments=1&ReferralNumMedia=0&MessageSid=SMd0e963c963d6e4b42947da3c95713970&AccountSid=AC9059c3ab167a3c0ace9cf3f0c5dd17ca&From=%2B17576791881&ApiVersion=2010-04-01";
//   var params2 = new URLSearchParams(foo);
//   // console.log(params2);
//   console.log(params2.get("Body"));
// };
