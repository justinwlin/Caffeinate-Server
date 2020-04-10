/*
Youtube Video reference for this code
https://youtu.be/MiPpQzW_ya0
*/
const { google } = require("googleapis")
const keys = require("./keys.json")
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

// ========================================
// Constants
// ========================================

const AMT_HOURS_TO_PING = 15
const spreadsheetId = "1aRlwgdp5M1QFZcm8ihg3I18OaQmHcVUkDRiO6rWlq7o"
const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ["https://www.googleapis.com/auth/spreadsheets"]
);
let counterPings;

// ========================================
// Authorization
// ========================================
client.authorize(function (err, tokens) {
    if (err) {
        console.log(err)
        return
    }
})

let gsapi = google.sheets({
    version: "v4",
    auth: client
})

const authorize = () => {
    client.authorize(function (err, tokens) {
        if (err) {
            console.log(err)
            return
        }
    })
    gsapi = google.sheets({
        version: "v4",
        auth: client
    })
}

// ========================================
// Getting google Sheet data
// ========================================
async function get(spreadsheetId) {
    const opt = {
        spreadsheetId: spreadsheetId,
        range: "Form Responses 1!A:C"
    }
    let data = await gsapi.spreadsheets.values.get(opt)
    let dataArray = data.data.values
    return dataArray;
}

// ========================================
// Sending Requests
// ========================================
const sendRequests = async (data) => {
    console.log("SENDING REQUESTS")
    for (row of data) {
        let website = row[1]
        let startTimeFromSheet = row[2]
        let currTime = parseInt(new Date().getUTCHours(), 0)
        let pingCondition = false
        startTimeFromSheet = startTimeFromSheet.split(",")
        console.log(startTimeFromSheet)

        if (currTime in startTimeFromSheet) {
            pingCondition = true
        }else{
            pingCondition = false
        }
        console.log("PING CONDITION: " + pingCondition + "; FOR: " + website)
        if (website.includes("http") && pingCondition) {

            axios.get(website)
                .then(console.log("Pinged: " + website))
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

// ========================================
// Interval Function to ping every 5 mins
// ========================================
setInterval(function () {
    counterPings += 1
    console.log("PINGED: " + counterPings)
    getRows()

}, 300000);

// ========================================
// Grabs the Data from Google Sheet > 
// > Gives it to Send Requests to ping all the servers 
// when set interval called
// ========================================

const getRows = async () => {
    authorize()
    let data = await get(spreadsheetId)
    console.log(data)
    sendRequests(data)
    return data
}

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running")
    counterPings = 0;
    try {
        getRows()
    }
    catch{
        console.log("ERROR GETTING ROWS")
    }

});
