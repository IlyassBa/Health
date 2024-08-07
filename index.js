const express = require('express')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const cors = require('cors')

const app = express()

// Add the middleware to parse the request body
app.use(express.json())



let corsOptions = {
  origin : ['http://localhost:4200'],
}


app.use(cors(corsOptions))

const port = 3000

const secrets = new Map();  



app.post('/auth-qr', (req, res) => {
  const user = req.body.name;

  console.log(req.body);
  console.log(`name ${user}`);

  // Generate a secret for the user
  const secret = speakeasy.generateSecret({
    name: user,
  });

  secrets.set(user, secret.base32);

  // Convert the secret to a QR code data URL
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }

    // Send the QR code data URL back to the client
    res.send(JSON.stringify({ qrCode: data, secret: secret.base32 }));
  });
});



app.post('/verify-token', (req, res) => {
  
  const { code, name } = req.body;
  const storedSecret = secrets.get(name);

  // Verify the user-provided token against the stored secret
  const verified = speakeasy.totp.verify({
    secret: storedSecret,
    encoding: 'base32',
    token: token,
  });

  if (verified) {
    res.send('Authentication successful');
  } else {
    res.status(401).send('Authentication failed');
  }
  
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})