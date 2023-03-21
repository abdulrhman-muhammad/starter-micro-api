const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

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


app.post('/validateSession', async (req, res) => {
  
  
  
   try {
   console.log('1');
    const { appleUrl } = req.body;
    console.log('2');
     
     var httpss = require('https');
     var fs = require('fs');
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
            domainName: 'colorswindow.com',
            displayName: 'Colors Window',
        },
        {
            httpsAgent,
        }
    );
    
    res.send('ok');
     
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
  
  
  
  
     
});


app.post('/pay', async (req, res) => {
    const { data } = req.body;

    console.log(data);

    // send payment request based o your payment provider requirements

    res.send({
        approved: true,
    });
});

app.listen(port, () => {
    console.log('💪 Server running on ➡️ ', `http://localhost:${port}`);
});
