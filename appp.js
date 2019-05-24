'use strict'
const pg = require('pg')
const config = require('./config');
const path = require('path');


const listener = new pg.Client(config.get("confsql"))
listener.connect()
listener.query('LISTEN watchers')
listener.on('notification', msg => {
    console.log("notification!");
    // do your thing here
})