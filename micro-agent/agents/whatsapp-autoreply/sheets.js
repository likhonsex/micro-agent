// micro-agent/agents/whatsapp-autoreply/sheets.js

const { google } = require("googleapis");
const { sheets: config } = require("./config");

/**
 * Appends a new lead to the Google Sheet.
 * @param {object} lead - The lead data to save.
 * @param {string} lead.timestamp - The timestamp of the message.
 * @param {string} lead.from - The contact number of the sender.
 * @param {string} lead.message - The message received.
 */
async function saveLead(lead) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: config.credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${config.sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[lead.timestamp, lead.from, lead.message]],
      },
    });

    console.log("Lead saved to Google Sheets:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving lead to Google Sheets:", error);
  }
}

module.exports = {
  saveLead,
};
