const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

// Configure express to use body parser and cors, and add our API endpoints
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/validateSession', async (req, res) => {
    const { appleUrl } = req.body;
    console.log(appleUrl);
    
    res.send('ok');
});
app.listen(port, () => {
    console.log('💪 Server running on ➡️ ', `http://localhost:${port}`);
});
