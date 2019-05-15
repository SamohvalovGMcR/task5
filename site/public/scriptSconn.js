const socket = io.connect('http://localhost:3033');
socket.on('message', function(value) {
    alert(value);
});

socket.on('whuN', function() {

    socket.emit("whuS");
});