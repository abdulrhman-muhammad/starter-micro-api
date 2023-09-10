const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const axios = require('axios');
// Configure express to use body parser and cors, and add our API endpoints
const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

// app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/applev', function(req, res){
    res.sendFile(__dirname + '/applev/index.html');
});

app.get('/applev/style.css', function(req, res){
    res.sendFile(__dirname + '/applev/style.css');
});

app.get('/applev/app.js', function(req, res){
    res.sendFile(__dirname + '/applev/app.js');
});


app.get('/.well-known/apple-developer-merchantid-domain-association.txt', function(req, res){
    res.sendFile(__dirname + '/.well-known/apple-developer-merchantid-domain-association.txt');
});


app.post('/validateSession', async (req, res) => {
  
  
  
    try {
   console.log('1');
  // console.log(req);
  // console.log(req.body);
    const { appleUrl } = req.body;
    console.log('2');
     
     var httpss = require('https');
     var fs = require('fs');
     var path = require('path');
     // use set the certificates for the POST request
    httpsAgent =  httpss.Agent({
        rejectUnauthorized: false,
        cert: fs.readFileSync(path.join(__dirname, './certificate_colorswindow.pem')),
        key: fs.readFileSync(path.join(__dirname, './certificate_colorswindow.key')),
    });
    console.log('3');
     
      response = await axios.post(
        appleUrl,
        {
            merchantIdentifier: 'merchant.colorswindow.com',
            domainName: 'friendly-seal-ring.cyclic.app',
            displayName: 'Colors Window',
        },
        {
            httpsAgent,
        }
    );
    // console.log(response);
  //  console.log('4');
    // res.send('ok');
  res.send(response.data);
     
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
  
  
  
  
     
});


app.post('/pay', async (req, res) => {
console.log(req.body);
  console.log(req.body.token.paymentData.data);
  console.log(req.body.token.paymentData.signature);
  console.log(req.body.token.paymentData.header);
    console.log(req.body.token.paymentData.version);
  console.log(req.body.token.paymentMethod.displayName);
   console.log(req.body.token.paymentMethod.network);
   console.log(req.body.token.paymentMethod.type);
   console.log(req.body.token.transactionIdentifier);
  
  console.log(req.body.customerEmail);
  var httpPay = require("https");

  var payOptions = {
  "method": "POST",
  "hostname": "api.tap.company",
  "port": null,
  "path": "/v2/tokens",
  "headers": {
    "authorization": "Bearer pk_live_JC2fuQ9SNysMh4ant8ebrXUd",
    "content-type": "application/json"
  }
};


  var payReq = httpPay.request(payOptions, function (ress) {
  var chunks = [];

  ress.on("data", function (chunk) {
      console.log(chunk);
    chunks.push(chunk);
  });


     ress.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log('body'+body.toString());
     });
});

  payReq.write(JSON.stringify({ type: 'applepay',
  token_data: 
   { data: 'CM8i9PNK4yXtKO3xmOn6uyYOWmQ+iX9/Oc0EWHJZnPZ/IAEe2UYNCfely3dgq3veEygmQcl0s8lvMeCIZAbbBvbZWPKng9lfUwP2u3IUOFfFyI4beE9znpQ/e0nyQiVh8NFyZun8o0/YZfdFhaBy8bunveULZkWODZy3vg1LLTk0wSRfzbiFav/krgeMvztl8U85Fefl1VJVoJbW/jtShwDkusHizw/p/hkLiOFcCYSz7h9culZQMTWfqsxIfTuY3mOl+NhjAHPP+UFv4wefXrQL9MKO2cI6ttXOp5k6M6mFV/Qe0fbmJ6GnDWDMSiikW+3eL0yi0IApAKmmVgPS+uk42dyhrnSPhB6A7EJBmhEEb3ErL1I69Jq9REjDHp+VoZR0fAbDtpbjKKMo',
     header: 
      { ephemeralPublicKey: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELAfDie0Ie1TxCcrFt69BzcQ52+F+Fhm5mDw6pMR54AzoFMgdGPRbqoLtFpoSe0FI/m0cqRMOVM2W4Bz9jVZZHA==',
        publicKeyHash: 'LjAAyv6vb6jOEkjfG7L1a5OR2uCTHIkB61DaYdEWD+w=',
        transactionId: '0c4352c073ad460044517596dbbf8fe503a837138c8c2de18fddb37ca3ec5295' },
     signature: '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',
     version: 'EC_v1' },
  client_ip: '192.168.1.20' }));
payReq.end();
    
  
    const { data } = req.body;
 console.log('44444');
    console.log('data'+data);

    // send payment request based o your payment provider requirements

    res.send({
        approved: true,
    });
});

app.listen(port, () => {
    console.log('💪 Server running on ➡️ ', `http://localhost:${port}`);
});
