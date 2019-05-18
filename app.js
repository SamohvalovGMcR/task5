'use strict'
const pg = require('pg')
const config = require('./config');
const path = require('path');
const http = require('http');
var jwt = require('jsonwebtoken');
const SECRET_PHRASE = 'secret';
let generateToken = (username) => {
    return jwt.sign({ 'entity_id': username }, SECRET_PHRASE);
};

const server = http.createServer().listen(config.get('port'), config.get('ip'), function() {
    console.log('Server listening on port=' + config.get('port') + ",  ip=" + config.get('ip'));
});

const io = require('socket.io')(server);

/* const confsql = { //переложить в nconf
    host: "localhost",
    database: "postgres",
    user: 'postgres',
    password: 'sevenseven'
}; */

//console.log(config.get("confsql"));

const pool = new pg.Client(config.get("confsql"));
pool.connect();


pool.query("CREATE TABLE users1 (Id SERIAL PRIMARY KEY, Name   CHARACTER VARYING(30) , passw CHARACTER VARYING(30))", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE  RULE rule1 AS ON INSERT TO public.users1 DO NOTIFY watchers, 'INSERT';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE  RULE rule2 AS ON UPDATE TO public.users1 DO NOTIFY watchers, 'update';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE  RULE rule3 AS ON DELETE TO public.users1 DO NOTIFY watchers, 'DELETE';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

io.sockets.on('connection', function(client) {
    // if (client.name) {
    client.emit("myName", client.name);
    // } //if 
    const valueFind = () => //get
        pool.query('SELECT *  FROM users1', (err, res) => {
            if (err) {
                console.log(err);
            }
            //console.log("RESSS" + JSON.stringify(res.rows[0]));
            client.emit("whu", res.rows);

            // pool.end()
        });


    valueFind();

    client.broadcast.emit('whuN');

    client.on("whuS", function() {

        // setTimeout(function() {
        valueFind();
        // }, 200);

    });


    pool.query('LISTEN watchers', (err, res) => {
        //console.log("watch" + JSON.stringify(res));
        if (err) {
            console.log(err)
        }



    });

    pool.on('notification', function(msg) {
        console.log("notification! " + JSON.stringify(msg));
        //client.emit("message", "notification!" + JSON.stringify(msg));
        client.broadcast.emit('whuN');
    });


    client.on("PaddB", function(data) { //добавить

        //console.log(data);
        if (!client.Token) {

            pool.query('INSERT INTO users1(name, passw) VALUES($1, $2) ', data, (err, res) => {
                // client.emit("message", "data " + data);
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0])
                        // { name: 'brianc', passw: 'brian.m.carlson@gmail.com' }
                }
            })

            client.Token = generateToken(data[0]);
            console.log(client.Token);

            //setTimeout(function() {
            valueFind();
            // }, 200);

            //console.log("err.stack")
            client.broadcast.emit('whuN');

        } else { client.emit("message", "Вы уже!"); return };
    });

    /* client.on("PdelAll", function() {
        pool.query('DROP TABLE', data, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
                
            }
        })
        client.broadcast.emit('whuN');
    }); */

    client.on("PdelB", function(data) { //удаление по имени
        pool.query("DELETE FROM users1 WHERE  name='" + data + "'", (err, res) => {
            if (err) {
                console.log(err.stack)
            }

        })
        console.log("err.stack")

        //setTimeout(function() {
        valueFind();
        // }, 200);

        client.broadcast.emit('whuN');
    });


    client.on("Pupdate", function(data) {
        pool.query("UPDATE users1 SET passw ='" + data[1] + "' WHERE name='" + data[0] + "'", (err, res) => {
            if (err) {
                console.log(err.stack)
            }

        })


        // setTimeout(function() {
        valueFind();
        // }, 200);

        client.broadcast.emit('whuN');
    });




    client.on("Pserch", function(data) {
        pool.query("SELECT * FROM users1 WHERE name = '" + data + "'", (err, res) => {
            if (err) {
                console.log(err.stack)
            }
            console.log("нашел " + JSON.stringify(res.rows));
            client.emit("Pserchres", res.rows);
        })


        /*  setTimeout(function() {
             valueFind();
         }, 200); */

        //client.broadcast.emit('whuN');
    });

    client.on("login", function(data) {
        delete client.Token;
        pool.query("SELECT * FROM users1 WHERE name = '" + data[0] + "'", (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
                console.log("наш" + JSON.stringify(res.rows));
                // client.emit("message", res.rows[0].passw);


                if (res.rows.length > 0 && data[1] && data[1] === res.rows[0].passw) {
                    client.Token = generateToken(res.rows[0].name);
                    client.name = res.rows[0].name; //!!!!!!!!
                    client.emit("message", "удачно " + res.rows[0].passw + "=" + data[1] + " " + res.rows[0].name + "=" + data[0] + " tok=" + client.Token);
                } else { client.emit("message", "не удачнно " + JSON.stringify(res.rows[0]) + " tok=" + client.Token); }
            }) //отправить массивом
    });

});

//NOT NULL UNIQUE