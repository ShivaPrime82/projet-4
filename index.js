const express = require("express");
const mysql = require("mysql");
const settings = require("./settings.json");

const sqlConfig = settings.sqlConfig;

const app = express();

app.listen(3000, () => {
    console.log("SERVER STARTED");  
});

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

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

app.route("/api/user/create")
    .get((req, res) => res.status(503).send({ status: "ERROR" }))
    .post((req, res) => {

        console.log(req.body);

        const user_mail = req.body.user_mail;
        const user_pass = req.body.user_pass;
        const user_firstname = req.body.user_firstname;
        const user_lastname = req.body.user_lastname;
        const user_birthdate = req.body.user_birthdate;

        const sqlConnection = mysql.createConnection(sqlConfig);

        sqlConnection.query(
            "INSERT INTO node_users VALUES (NULL, ?, ?, ?, ?, ?)",
            [user_mail, user_pass, user_firstname, user_lastname, user_birthdate],
            (error, result) => {
                if (error) {
                    console.log("ERROR", error.code);   
                    res.status(503).send({ status: "ERROR" });        
                } else {
                    res.send({ status: "OK"});
                    console.log(result); 
                }
                sqlConnection.end();
            }
        );
    });
    