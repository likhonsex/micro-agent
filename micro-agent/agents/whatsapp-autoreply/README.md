# WhatsApp Auto-Reply + Lead Saver Agent

This agent automatically replies to incoming WhatsApp messages and saves the contact details and message to a Google Sheet.

## Features

- Auto-reply to incoming WhatsApp messages
- Save contact details + message to Google Sheets
- Customizable reply messages
- Business hours detection (optional)

## Prerequisites

- Node.js (v18 or higher)
- A Google account with Google Sheets enabled
- A WhatsApp account

## Setup Instructions

### 1. Install Dependencies

Navigate to the `micro-agent` directory and run the following command to install the necessary dependencies:

```bash
npm install
```

### 2. Set up Google Sheets API

1.  Follow the instructions in the [Google Cloud documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) to create a service account and download the credentials as a JSON file.
2.  Rename the downloaded JSON file to `credentials.json` and place it in the `micro-agent/agents/whatsapp-autoreply` directory.
3.  Create a new Google Sheet and get its `spreadsheetId` from the URL (e.g., `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`).
4.  Share the Google Sheet with the `client_email` found in your `credentials.json` file, giving it "Editor" permissions.

### 3. Configure the Agent

Open the `config.js` file in the `micro-agent/agents/whatsapp-autoreply` directory and update the following settings:

- `replyMessage`: The message to be sent as an auto-reply.
- `businessHours`: Enable or disable business hours and define the hours of operation.
- `sheets.spreadsheetId`: Your Google Sheet ID.
- `sheets.sheetName`: The name of the sheet where leads will be saved.

### 4. Run the Agent

Run the following command from the `micro-agent` directory to start the agent:

```bash
npm run start:whatsapp
```

On the first run, a QR code will be displayed in the terminal. Scan it with your WhatsApp mobile app to log in.

## Support

For any issues or questions, please refer to the support guide in the `templates` directory.
