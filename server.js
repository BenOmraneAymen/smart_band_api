const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Render the EJS file and pass in an empty array of numbers
  res.render('random', { numbers: [] });
});

io.on('connection', (socket) => {
  console.log('A user connected');
  setInterval(() => {
    const value = Math.floor(Math.random() * 100) + 1;
    console.log(`Sending value: ${value}`);
    // Add the new value to the array and send it to the client
    socket.emit('value', value);
  }, 1000);
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
