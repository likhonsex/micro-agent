// micro-agent/agents/whatsapp-autoreply/index.js
require('dotenv').config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { replyMessage, businessHours } = require("./config");
const { saveLead } = require("./sheets");
const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  // Generate and display the QR code in the terminal
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  // Ignore messages from groups and status updates
  if (message.from.endsWith("@g.us") || message.fromMe) {
    return;
  }

  // Save the lead to Google Sheets
  await saveLead({
    timestamp: new Date().toISOString(),
    from: message.from,
    message: message.body,
  });

  // Check if business hours are enabled and if it's outside of business hours
  if (businessHours.enabled) {
    const now = new Date();
    const zonedTime = utcToZonedTime(now, businessHours.timezone);
    const day = zonedTime.getDay();
    const hours = zonedTime.getHours();

    const businessDay = businessHours.hours[day];
    if (businessDay && hours >= businessDay.start && hours < businessDay.end) {
      // It's within business hours, so don't send an auto-reply
      return;
    }
  }

  // Send the auto-reply
  await message.reply(replyMessage);
});

client.initialize();
