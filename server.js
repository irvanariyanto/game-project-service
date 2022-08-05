require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Platinum!');
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
