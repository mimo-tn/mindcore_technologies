const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require("cors");
require("./config/mongoose.config");
app.use(express.json(), express.urlencoded({extended:true}), cors());

const mindcoreRoutes = require('./routes/mindcore.routes');
mindcoreRoutes(app);

app.listen(port, () => console.log(`Écoute sur le port: ${port}`) );