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
// console.log(req.body);
//   console.log(req.body.token.paymentData.data);
//   console.log(req.body.token.paymentData.signature);
//   console.log(req.body.token.paymentData.header);
//    console.log(req.body.token.paymentData.header.ephemeralPublicKey);
//    console.log(req.body.token.paymentData.header.publicKeyHash);
//    console.log(req.body.token.paymentData.header.transactionId);
//     console.log(req.body.token.paymentData.version);
   
//    console.log(req.body.token.transactionIdentifier);
  
//   console.log(req.body.customerEmail);



// var request = require("request");

// var pOptions = { method: 'POST',
//   url: 'https://api.tap.company/v2/tokens',
//   headers: 
//    { 'content-type': 'application/json',
//      authorization: 'Bearer pk_live_JC2fuQ9SNysMh4ant8ebrXUd' },
//   body: 
//    { type: 'applepay',
//      token_data: 
//       { data: req.body.token.paymentData.data,
//         header: 
//          { ephemeralPublicKey: req.body.token.paymentData.header.ephemeralPublicKey,
//            publicKeyHash: req.body.token.paymentData.header.publicKeyHash,
//            transactionId: req.body.token.paymentData.header.transactionId },
//         signature: req.body.token.paymentData.signature,
//          version: req.body.token.paymentData.version },
//      client_ip: '192.168.1.20' },
//   json: true };

// request(pOptions, function (error, response, body) {
//   console.log('77777787776');
//   if (error) throw new Error(error);
//  console.log('5656565656565');
//   console.log(body);
// });


 const {data} = await axios.post('https://api.tap.company/v2/tokens', {
   type: 'applepay',
    token_data: { data: req.body.token.paymentData.data,
        header: 
         { ephemeralPublicKey: req.body.token.paymentData.header.ephemeralPublicKey,
           publicKeyHash: req.body.token.paymentData.header.publicKeyHash,
           transactionId: req.body.token.paymentData.header.transactionId },
        signature: req.body.token.paymentData.signature,
         version: req.body.token.paymentData.version },
     client_ip: '192.168.1.20'
  }, {
    headers: {
      'Content-Type':'application/json',
       authorization : 'Bearer pk_live_JC2fuQ9SNysMh4ant8ebrXUd'
    }
})
  console.log({data});


  
//   var httpPay = require("https");

//   var payOptions = {
//   "method": "POST",
//   "hostname": "api.tap.company",
//   "port": null,
//   "path": "/v2/tokens",
//   "headers": {
//     "authorization": "Bearer pk_live_JC2fuQ9SNysMh4ant8ebrXUd",
//     "content-type": "application/json"
//   }
// };


//   var payReq = httpPay.request(payOptions, function (ress) {
//       console.log('sdsdfsdfsdfdsfsd3235435345534534534');
//      console.log(ress);
//   var chunks = [];

//   ress.on("data", function (chunk) {
//       console.log('sdsd 5435345534534534');
//       console.log(chunk);
//     chunks.push(chunk);
//     console.log(chunks);
//   });


//      ress.on("end", function () {
//          console.log('sdsd 5435345dddzzzzzzcvdedecxvdesxcdesxcvdssedxcdesxcvdsescvds534534534');
//     var body = Buffer.concat(chunks);
//     console.log('body'+body.toString());
//      });
// });

//   payReq.write(JSON.stringify({ type: 'applepay',
//   token_data: 
//    { data: req.body.token.paymentData.data,
//      header: 
//       { ephemeralPublicKey: req.body.token.paymentData.header.ephemeralPublicKey,
//         publicKeyHash: req.body.token.paymentData.header.publicKeyHash,
//         transactionId: req.body.token.paymentData.header.transactionId },
//      signature: req.body.token.paymentData.signature,
//      version: req.body.token.paymentData.version },
//   client_ip: '192.168.1.20' }));
// payReq.end();
    
  
    // const { data } = req.body;
 console.log('44444');
    // console.log(payReq);

    // send payment request based o your payment provider requirements

    res.send({
        approved: true,
    });
});

app.listen(port, () => {
    console.log('💪 Server running on ➡️ ', `http://localhost:${port}`);
});
