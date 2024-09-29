const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const publicVapidKey = "BE4LLxozZ2s94SOfmtLy5zCBd9H3Ll1TaBNlNY5d8OjnErQQ7PNBPj2BsTLSOoHCDigVBXMJpEU96iTz33UyZ_E";
const privateVapidKey = "pUm99PHZzkqyw0Xi0br0kQRLqngHMEWHdpY8FLQ5Zq8";
webpush.setVapidDetails("mailto:mamdou7.khalaf@gmail.com", publicVapidKey, privateVapidKey);
const subscriptionsFile = path.join(../subscriptions.json);
function loadSubscriptions() {
    try {
        const data = fs.readFileSync(subscriptionsFile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading subscriptions file:", error);
        return [];
    }
}
function saveSubscriptions(subscriptions) {
    try {
        fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing to subscriptions file:", error);
    }
}
let subscriptions = loadSubscriptions();
app.post("/subscribe", (req, res) => {
    const subscription = req.body;
    const isSubscribed = subscriptions.find((sub) => sub.endpoint === subscription.endpoint);
    if (!isSubscribed) {
        subscriptions.push(subscription);
        saveSubscriptions(subscriptions);
    }
    console.log("Subscription received and saved:", subscription);
    res.status(201).json({ message: "Subscription added successfully" });
});
app.use((req, res) => {
    res.status(404).sendFile(__dirname + "../public/404.html");
});
