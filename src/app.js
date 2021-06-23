const express = require('express');
const serverless = require('serverless-http');
const socket = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

const { port } = process.env || 5000;

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

// Unit testing
module.exports = {
    server: function() {
        return 'server is listen to request on port 3000'
    }
}

// Serverless export module
module.exports.handler = serverless(app);