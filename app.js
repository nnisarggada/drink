const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files (including frontend HTML and JavaScript)
app.use(express.static(path.join(__dirname, "public")));

// Replace these values with your own VAPID keys
const VAPID_PUBLIC_KEY =
  "BK706eI71lwQ4I2kOn7AJ4WVeVKajgP6b1yG5qZIxMP38zcxl-7f3qWA5-qzdTgEoSKv6ihh63s3ESj92f3T-GA";
const VAPID_PRIVATE_KEY = "c9B-wJPbeP1SId3hFO3FuE3Hjgd0PIlb0m-E812x2SU";

// Set VAPID keys for web-push library
webpush.setVapidDetails(
  "mailto:contact@nnisarg.in",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
);

// Store subscriptions
let subscriptions = [];

// Endpoint to subscribe to push notifications
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  console.log("New subscription:", subscription);
  res.status(201).json({});
});

// Send reminder to all subscribers every hour
setInterval(() => {
  const reminder = {
    title: "Drink Water!",
    body: "Nnisarg is reminding you to drink water.",
    icon: "/icon.png",
    tag: "reminder",
  };

  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription, JSON.stringify(reminder))
      .catch((error) => console.error("Error sending reminder:", error));
  });
}, 3600000); // 3600000 milliseconds = 1 hour

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
