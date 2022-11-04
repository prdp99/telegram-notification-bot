require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;
const app = express();
app.use(bodyParser.json());
const init = async () => {
  const res = await axios.get(` ${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  // console.log(res.data);
};

app.post(URI, async (req, res) => {
  //console.log(req.body);
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  async function startMessage() {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Click <a href=${process.env.LOGIN}>here</a> to get connected. Get real time updates on meet and chat requests to maximize your experience`,
      parse_mode: "HTML",
    });
  }

  if (text === "/start") {
    startMessage();
  }
  function verifyLogin() {
    //verify login through JWT auth token , cookie or session 
    return //result
  }
  const isVerified = verifyLogin;
  if (isVerified) {
    //check if user has linked phone
    function checkPhoneLinked() {
      //check in DB
      //return true or false
      console.log("phone chekced");
      return true;
    }
    const isLinked = checkPhoneLinked();
    async function getLurkerId() {
      //fetch lurker id from DB
      return; //id;
    }
    async function getInfluencerId() {
      //fetch influencer id from DB
      return; //id;
    }
    const influencer_chatId = getInfluencerId();
    const lurker_chatId = getLurkerId();
    async function requestMeetups() {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: influencer_chatId,
        text: `you have received a meet up request. Click<a href=${process.env.MEETS_URL}>here</a> to check
        the details and accept/reject/reschedule`,
        parse_mode: "HTML",
      });
    }
    async function generateURL() {
      //generate JWT token for expiry date
      return //url
    }
    const PAYMENT_URL = generateURL();
    async function responseMeetups() {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: lurker_chatId,
        text: `your request to meetup has been accepted. 
        Click <a href=${PAYMENT_URL}>here</a> to proceed further`,
        parse_mode: "HTML",
      });
    }
    if (isLinked) {
      //notification feature enabled
      //save chatId to DB
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `You are connected to Elitely bot`,
      });
      //eligible for recieving notifications
      //if Lurker requests for meetup or unlocks chat / listen for req
      const request = true; // if lurker sending request meetup or chat
      if (request) {
        requestMeetups();
      }
      //if Personality/Influencer accepts the request
      const response = true;
      if (response) {
        responseMeetups();
      }
    } else {
      //redirect to setting page to register
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `Click<a href=${process.env.SETTING_URL}>here</a> to link
        your phone number`,
        parse_mode: "HTML",
      });
    }
  } else {
    startMessage();
  }
  return res.send();
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("app running on port ", process.env.PORT || 5000);
  await init();
});
