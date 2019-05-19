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



//console.log(config.get("confsql"));

const pool = new pg.Client(config.get("confsql"));
pool.connect();


pool.query("CREATE TABLE public.users1( user_id serial NOT NULL, user_name character varying NOT NULL, user_password character varying NOT NULL, user_email character varying NOT NULL, PRIMARY KEY (user_id), CONSTRAINT user_name_uq UNIQUE (user_name), CONSTRAINT user_email_uq UNIQUE (user_email))", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE OR REPLACE RULE  rule1 AS ON INSERT TO public.users1 DO NOTIFY watchers, 'INSERT';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE OR REPLACE  RULE rule2 AS ON UPDATE TO public.users1 DO NOTIFY watchers, 'update';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});

pool.query("CREATE OR REPLACE  RULE rule3 AS ON DELETE TO public.users1 DO NOTIFY watchers, 'DELETE';", (err, res) => {
    if (err) {
        console.log(err.stack)
    }
});
///???
const nameFind = (data) => "SELECT * FROM users1 WHERE user_name = '" + data + "'";

pool.query(nameFind('admin'), (err, res) => {
    if (err) {
        console.log(err.stack)
    } //undefined!!!
    if (res.rows.length > 0) {
        console.log("admin yes" + JSON.stringify(res.rows))
    } else {
        console.log("admin no" + JSON.stringify(res.rows));
        pool.query("INSERT INTO users1(user_name, user_password, user_email) VALUES ('admin', 'admin', 'admin@admin.com')", (err, res) => {

            if (err) {
                console.log(err.stack)
            }
        });

    };
});

///???

io.sockets.on('connection', function(client) {
    // if (client.name) {
    client.emit("myName", client.name); ///????

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


    client.on("PaddB", function(data) { //добавить//verify

        //console.log(data);
        if (client.Token) {
            client.emit("message", "Вы уже!")
        } else {
            pool.query(nameFind(data[0]), (err, res) => {
                if (err) {
                    console.log(err.stack)
                }

                console.log("data" + res.rows);

                if (res.rows.length !== 0) {
                    client.emit("message", "Такой есть!")
                } else {
                    pool.query('INSERT INTO users1(user_name, user_password, user_email ) VALUES($1, $2, $3) ', data, (err, res) => {
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
                } //else
            })
        };
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
        if (client.name === "admin" && data !== "admin") {
            pool.query("DELETE FROM users1 WHERE  user_name='" + data + "'", (err, res) => {
                if (err) {
                    console.log(err.stack)
                }

            })
            console.log("err.stack")

            //setTimeout(function() {
            valueFind();
            // }, 200);

            client.broadcast.emit('whuN');
        } else client.emit("message", "Вы не АДМИН!");
    });


    client.on("Pupdate", function(data) {
        if (client.name === data[0] || client.name === "admin") { //проверка, не надежно
            pool.query("UPDATE users1 SET user_password ='" + data[1] + "' WHERE user_name='" + data[0] + "'", (err, res) => {
                if (err) {
                    console.log(err.stack)
                }

            })


            // setTimeout(function() {
            valueFind();
            // }, 200);

            client.broadcast.emit('whuN');
        } else client.emit("message", "Чужой нелзя!");
    });



    /* 
        client.on("Pserch", function(data) {
            //console.log('data ' + nameFind(data))
            //client.emit("Pserchres", nameFind(data).length); //лучше не отправлять vse
            pool.query(nameFind(data), (err, res) => {
                if (err) {
                    console.log(err.stack)
                }

                console.log("data" + res.rows);

            })


            /*  setTimeout(function() {
                 valueFind();
             }, 200); */

    //client.broadcast.emit('whuN');*/
    // });

    client.on("login", function(data) {
        delete client.Token;
        delete client.name;
        pool.query(nameFind(data[0]), (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
                console.log("наш" + JSON.stringify(res.rows));
                // client.emit("message", res.rows[0].passw);


                if (res.rows.length > 0 && data[1] && data[1] === res.rows[0].user_password) {
                    client.Token = generateToken(res.rows[0].user_name);
                    client.name = res.rows[0].user_name; //!!!!!!!!
                    client.emit("sendname", client.name);
                    client.emit("message", "удачно " + res.rows[0].user_password + "=" + data[1] + " " + res.rows[0].user_name + "=" + data[0] + " tok=" + client.Token);
                } else { client.emit("message", "не удачнно " + JSON.stringify(res.rows[0]) + " tok=" + client.Token); }
            }) //отправить массивом
    });

});

//NOT NULL UNIQUE