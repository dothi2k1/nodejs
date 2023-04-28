// get the client
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: ''
});

// simple query
// connection.query(
//     'SELECT * FROM `accounts`',
//     function(err, results, fields) {
//         // document.write('Kết Nối Sql Thành Công');
//         console.log('Kết Nối Sql Thành Công');
//         console.log(results); // results contains rows returned by server
//         // // console.log(fields); // fields contains extra meta data about results, if available

//     }
// );

module.exports = connection;