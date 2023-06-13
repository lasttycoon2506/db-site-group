//File for Connecting to Database Instance

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
// changed to dummy login for github purposes
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'hostname',
    user: 'username',
    password: 'password',
    database: 'databasename'
})

// Export it for use in our application
module.exports.pool = pool;