const express = require('express');
const app = express();
const axios = require('axios');
//DB
const connectDB = require('./DB/ConnectDB');
const Token = require('./Models/UserSchema');
//CORS
const cors = require('cors');
//.ENV
require('dotenv').config();
//PORT
const port = process.env.PORT || 5000;
//SECURITY
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const EventEmitter = require('events');
const moment = require('moment-timezone');

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();

async function generaNewToken() {
  try {
    const params = {
      refresh_token: process.env.REFRESH_TOKEN,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope:
        'ZohoCRM.modules.all,Desk.tickets.ALL,Desk.contacts.ALL,ZohoSubscriptions.fullaccess.all,Desk.contacts.UPDATE,Desk.tasks.READ,Desk.search.READ,Desk.tickets.READ,Desk.contacts.READ',
      grant_type: 'refresh_token',
    };
    const ZohoRequest = await axios.post(
      'https://accounts.zoho.in/oauth/v2/token',
      null,
      { params }
    );
    if (!ZohoRequest.data || !ZohoRequest.data.access_token) {
      console.error('Zoho Token Creation Issue');
      return;
    }

    const { access_token } = ZohoRequest.data;
    const existingToken = await Token.findOne();
    if (!existingToken) {
      console.error('Token not found');
      return;
    }

    existingToken.BearerToken = access_token;
    await existingToken.save();
  } catch (error) {
    console.error('Error refreshing Zoho token:', error.message);
  }
}
generaNewToken();
setInterval(generaNewToken, 60 * 60 * 1000);

app.get('/api/auth/Token', async (req, res) => {
  try {
    const token = await Token.findOne();
    console.log(token);
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    const FullToken = 'Zoho-oauthtoken ' + token.BearerToken;
    return res.status(200).json({ token: FullToken });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/newToken', async (req, res) => {
  const name = req.body;
  if (!name) {
    return res.status(404).json({ error: 'Name not found' });
  }
  console.log('I m getting called');
  try {
    // const zohoData = {
    //   refresh_token:
    //     '1000.e571752c5d9e9b94044542621327ae38.2fc29af8ab61fe78a0ace94fb77727bf',
    //   client_id: '1000.IJSUXC1199E5GTAI0GHEJE879XP8YW',
    //   client_secret: '0cee3a6d8834f049675f471f2f0d284ecab590adc5',
    //   scope:
    //     'ZohoCRM.modules.all,Desk.tickets.ALL,Desk.contacts.ALL,ZohoSubscriptions.fullaccess.all,Desk.contacts.UPDATE',
    //   grant_type: 'refresh_token',
    // };
    const ZohoRequest = await axios.post(
      'https://accounts.zoho.in/oauth/v2/token?refresh_token=1000.06f9d194cd59a19018e2814243bbd4f9.98b796e7b8c6bcd4b16aa866e43fe6e2&client_id=1000.IJSUXC1199E5GTAI0GHEJE879XP8YW&client_secret=0cee3a6d8834f049675f471f2f0d284ecab590adc5&scope=ZohoCRM.modules.all,Desk.tickets.ALL,Desk.contacts.ALL,ZohoSubscriptions.fullaccess.all,Desk.contacts.UPDATE,Desk.tasks.READ,Desk.search.READ,Desk.tickets.READ,Desk.contacts.READ&grant_type=refresh_token'
    );
    if (!ZohoRequest) {
      return res.status(404).json({ error: 'Zoho Token Creation Issue' });
    }

    const { access_token } = ZohoRequest.data;
    console.log('zoho token has been called', access_token);
    const existingToken = await Token.findOne();
    if (!existingToken) {
      return res.status(404).json({ error: 'Token not found' });
    }
    existingToken.BearerToken = access_token;
    await existingToken.save();
    const FullToken = 'Zoho-oauthtoken ' + access_token;
    return res.status(200).json({ token: FullToken });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/sendMessage', async (req, res) => {
  try {
    const { apiKey, campaignName, destination, userName, templateParams } =
      req.body;
    console.log(apiKey, campaignName, destination, userName, templateParams);
    const response = await axios.post(
      'https://backend.api-wa.co/campaign/flexiwaba/api',
      {
        apiKey,
        campaignName,
        destination,
        userName,
        templateParams,
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const retailerIDsToCheck = [
  'qy0f6jzspi',
  'ygj25q09bt',
  'mokl78gv7w',
  'mqtwiurixc',
  '9pi8r3bqjr',
  'lucqrik092',
  'xwihrtwudw',
  '1arief76aa',
  '11h8m2ns9y',
  'sc0ay0t4d4',
  '2l5f0j3wr8',
  '0me5f9h6k3',
  'n8woqbql9i',
  'oulnula2lr',
  'qv0d432psu',
];
app.post('/api/itemFormat', async (req, res) => {
  try {
    const amount = req.headers.total;
    const data = JSON.parse(req.headers.data);
    if (!data) {
      return res
        .status(500)
        .json({ msg: 'Internal Server Errors', quantity: 0 });
    }

    const data1 = data.product_items;
    let itemQuantityMore = false;
    let totalQuantity = 0;
    //checking for quantity more than 15
    data1.forEach((item) => {
      if (item.quantity > 15) {
        itemQuantityMore = true;
        return;
      } else {
        totalQuantity += item.quantity;
      }
    });

    if (itemQuantityMore) {
      return res.status(400).json({
        msg: 'One or More items in your cart have individual quantity more than 15, Kindly reduce it.',
        quantity: 0,
      });
    }
    //total quantity

    let matchFound = false;
    data1.forEach((retailerID) => {
      if (retailerIDsToCheck.includes(retailerID.product_retailer_id)) {
        matchFound = true;
        return;
      }
    });
    if (matchFound) {
      return res.status(200).json({ msg: 'True', quantity: totalQuantity });
    } else {
      return res.status(200).json({ msg: 'False', quantity: totalQuantity });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error', quantity: 0 });
  }
});
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

app.post('/api/timeFormat', async (req, res) => {
  try {
    const { datetime } = req.headers;
    let [, year, month, day] = datetime.match(/^(\d{4})-(\d{2})-(\d{2})/);
    console.log(year, month, day);
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);
    console.log(year, month, day);
    if (month === 2 && day > (isLeapYear(year) ? 29 : 28)) {
      console.log('why this');
      return res.status(400).json({
        msg: 'Invalid date. Please select a correct date and time value',
      });
    }

    const date = new Date(datetime);
    const currentDate = new Date();

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        msg: 'Invalid datetime. Please select a correct date and time value',
      });
    }

    const adjustedDate = new Date(date.getTime() - (5 * 60 + 30) * 60000);
    const adjustedUTCString = adjustedDate.toISOString();

    const timeDifferenceInMilliseconds = adjustedDate - currentDate;
    const timeDifferenceInHours =
      timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (timeDifferenceInHours < 1) {
      return res.status(403).json({
        msg: `Kindly select a time and date 1 hour from the current time.`,
      });
    }

    return res.status(200).json({ msg: adjustedUTCString });
  } catch (error) {
    return res.status(400).json({
      msg: 'Invalid date. Please select a correct date and time value',
    });
  }
});

// app.post('/api/auth/Token', async (req, res) => {
//   try {
//     // Create a new Token document based on the request body
//     const newToken = new Token({
//       BearerToken: req.body.BearerToken, // Assuming the BearerToken is sent in the request body
//     });

//     // Save the new token to the database
//     await newToken.save();

//     // Respond with a success message
//     return res.json({ message: 'Token saved successfully', token: newToken });
//   } catch (error) {
//     // If an error occurs, respond with an error message
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//START APP
