const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");
const config = require("./config");

var corsOptions = {
  origin: config.CLIENT_URI, optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); //allows external sites to access server

// parse application/json
app.use(bodyParser.json());





const soccerRoutes = require("./Apis/soccerRoutes");
app.use("/api/sports/soccer", soccerRoutes);

const SportsRoutes = require("./Apis/sportsRoutes");
app.use("/api/sports", SportsRoutes);




app.get("/", (req, res) => {
  res.send("Welcome to Sportsly API server ");
});

module.exports = app;
