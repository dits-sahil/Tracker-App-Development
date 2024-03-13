const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceAccount  = require('./tracker-app-5a80b-firebase-adminsdk-c4g0m-1e229e5e22.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

app.post('/getCustomToken', (req, res) => {
  const uid = req.body.uid; // Get UID from request
  if (!uid) {
    res.status(400).send('UID is required');
    return;
  }

  admin.auth().createCustomToken(uid)
    .then((customToken) => {
      res.json({ customToken });
    })
    .catch((error) => {
      console.error('Error creating custom token:', error);
      res.status(500).send('Internal server error');
    });
});
app.post('/sendPasswordResetEmail', (req, res) => {
  const uid = req.body.email; // Get UID from request
  if (!uid) {
    res.status(400).send('email is required');
    return;
  }

  admin.auth().generatePasswordResetLink(uid)
    .then((link) => {
      res.json({ link });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
