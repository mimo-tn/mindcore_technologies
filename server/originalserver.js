// server.js
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Importer la configuration MySQL
const db = require("./config/mysql.config");

// Middleware pour traiter les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importer et configurer les routes
const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes); // Préfixe des routes

// Démarrer le serveur
app.listen(port, () => console.log(`Écoute sur le port: ${port}`));

