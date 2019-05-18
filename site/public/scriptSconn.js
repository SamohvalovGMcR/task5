 socket = io.connect('http://localhost:3033'); //const
 socket.on('message', function(value) {
     alert(value);
 });

 socket.on('whuN', function() {

     socket.emit("whuS");
 });

 //const myName;

 //socket.on('myName', function(name) {
 let name = window.localStorage.getItem('aName');
 //alert('myName' + name);
 //});
 let p = document.createElement('p');
 p.innerHTML = "Вы-" + name;
 document.getElementById("Hn").appendChild(p); //