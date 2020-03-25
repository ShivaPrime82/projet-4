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

