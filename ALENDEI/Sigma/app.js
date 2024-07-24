const express = require('express');
//DB
const connectDB = require('./DB/ConnectDB');
//CORS
const cors = require('cors');
const User = require('./Models/UserSchema');
//.ENV
require('dotenv').config();
const axios = require('axios');
//PORT
const port = process.env.PORT || 5000;
//DEFAULT IMPORT

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/v1', userRouter);
app.post('/v1/createUser', async (req, res) => {
  const { phonenumber, user_ns, Email, FullName } = req.body;
  const PhoneNumber = parseInt(phonenumber);
  await User.create({
    PhoneNumber,
    user_ns,
    Email,
    FullName,
  });
  return res.status(201).json({ Message: 'User created' });
});

app.post('/v1/updateUser', async (req, res) => {
  // const { user_ns } = req.body;
  try {
    // const userData = await User.findOne({ user_ns });
    const users = await User.find();
    for (const user of users) {
      const { user_ns } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.SIGMA_OCP}`,
        },
        params: { user_ns },
      };
      try {
        const getUserData = await axios.get(
          'https://omni.alendei.io/api//subscriber/get-info',
          config
        );
        const { user_fields } = getUserData.data.data;

        if (!user_fields || user_fields.length === 0) {
          console.log(`No user fields available for user_ns: ${user_ns}`);
          continue;
        }
        let FullName = '';
        let Email = '';
        let PhoneNumber = null;
        user_fields.map((field) => {
          if (field.name === 'Name_of_Visitor') {
            FullName = field.value;
          }
          if (field.name === 'Email Address') {
            Email = field.value;
          }
          if (field.name === 'Mobile Number') {
            // PhoneNumber = parseInt(field.value);
            const phoneValue = field.value;
            if (!isNaN(phoneValue)) {
              PhoneNumber = phoneValue;
            }
          }
        });

        // await User.updateOne({ user_ns }, { FullName, Email, PhoneNumber });
        const update = { FullName, Email };
        if (PhoneNumber !== null) {
          if (PhoneNumber.length === 10) {
            PhoneNumber = '91' + PhoneNumber;
            update.PhoneNumber = parseInt(PhoneNumber);
          } else {
            update.PhoneNumber = PhoneNumber;
          }
        }
        console.log(FullName, Email, PhoneNumber);
        await User.updateOne({ user_ns }, update);
      } catch (error) {
        console.error(
          `Error fetching data for user_ns: ${user_ns}`,
          error.response ? error.response.data : error.message
        );
      }
    }
    return res.status(200).json({ message: 'All users processed' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//START APP
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
