// Make connection front-end setup
const socket = io.connect('http://localhost:8000');

// Query DOM
const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit events
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
})

// Listen for events- front_end
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});