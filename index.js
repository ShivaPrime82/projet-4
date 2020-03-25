const express = require("express");
const mysql = require("mysql");
const settings = require("./settings.json");

const sqlConfig = settings.sqlConfig;

const app = express();

app.listen(3000, () => {
    console.log("SERVER STARTED");  
});

app.get("/api/user", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);
 
    sqlConnection.query(
        "SELECT id, email, firstname, lastname, birthdate FROM node_users WHERE id = 2 LIMIT 1",
        (error, result) => {
            if (error) {
                console.log("ERROR", error.code);           
            } else {
                console.log("RESULT", result);
                res.send(result[0]);      
            }
            sqlConnection.end();
        }
    );
});

app.get("/api/user/create", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "INSERT INTO node_users VALUES (NULL, 'bob2@yopmail.net', 'pass', 'bob', 'toto', '1990-03-17')",
        (error, result) => {
            if (error) {
                console.log("ERROR", error.code);   
                res.status(503).send("oups ... an error as occured !!");        
            } else {
                res.send({ status: "OK"});
                console.log(result);
                     
            }
            sqlConnection.end();
        }
    );
});

