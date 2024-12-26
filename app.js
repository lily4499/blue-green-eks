const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
  console.log(`Green Service is running on port ${PORT}`);
});

