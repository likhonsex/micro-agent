// micro-agent/agents/whatsapp-autoreply/config.js
require('dotenv').config();

module.exports = {
  // The message that will be sent as an auto-reply
  replyMessage: "Thank you for your message! We have received it and will get back to you shortly.",

  // Optional: Define business hours to only send auto-replies outside of these hours.
  // If you want to reply 24/7, set businessHours.enabled to false.
  businessHours: {
    enabled: true,
    // Day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
    // 9:00 AM to 5:00 PM from Monday to Friday
    hours: {
      0: null, // Sunday
      1: { start: 9, end: 17 }, // Monday
      2: { start: 9, end: 17 }, // Tuesday
      3: { start: 9, end: 17 }, // Wednesday
      4: { start: 9, end: 17 }, // Thursday
      5: { start: 9, end: 17 }, // Friday
      6: null  // Saturday
    },
    timezone: "Asia/Dhaka" // Example timezone, change to your local timezone
  },

  // Google Sheets configuration
  sheets: {
    spreadsheetId: process.env.SPREADSHEET_ID, // The ID of your Google Sheet
    sheetName: "Leads", // The name of the sheet where leads will be saved
    credentialsPath: "./credentials.json" // Path to your Google service account credentials
  }
};
