const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
//setting up App
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server listening to requests on port ${port}`);
});

app.use(cors());
//static files
app.use(express.static('src/public'));

app.get('/', (req, res) => {
  res.send('home');
});
//socket setup
const io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  //Handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
