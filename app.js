const express = require('express');
const socket = require('socket.io');
const app = express();

const port = 3000;

const server = app.listen(port, () => {
    console.log(`server is listen to request on port ${port}`);
})

// Static files middleware
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });

});