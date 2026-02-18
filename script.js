const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_REST_KEY = process.env.ONE_SIGNAL_REST_KEY;

app.post("/send", async (req, res) => {
  const { title, message } = req.body;

  const payload = {
    app_id: ONE_SIGNAL_APP_ID,
    included_segments: ["Subscribed Users"],
    headings: { en: title },
    contents: { en: message },
    url: "https://gaxsin.github.io/web-abrasipesisir/"
  };

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${ONE_SIGNAL_REST_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    res.json({ success:true, data });
  } catch(err){
    console.error(err);
    res.status(500).json({ success:false, error:err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
