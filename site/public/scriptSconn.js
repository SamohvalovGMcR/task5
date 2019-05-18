/* let name1 = window.localStorage.getItem('aName') || []; */
socket = io.connect('http://localhost:3033'); //const
socket.on('message', function(value) {
    alert(value);
});

socket.on('whuN', function() {

    socket.emit("whuS");
});

//const myName;

//socket.on('myName', function(name) {


//alert('myName' + name);
//});
/* let p = document.createElement('p');
p.innerHTML = "Вы-" + name1;
document.getElementById("Hn").appendChild(p); */ //