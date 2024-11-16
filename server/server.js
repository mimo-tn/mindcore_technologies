//server.js
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");

// Middleware pour traiter les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importer et configurer les routes
const userRoutes = require('./routes/user.routes');
const departementRoutes = require('./routes/departement.routes'); // Importez les routes des départements

app.use('/api', userRoutes); // Préfixe des routes utilisateur
app.use('/api', departementRoutes); // Préfixe des routes département

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Écoute sur le port: ${port}`));


//hash
// const bcrypt = require('bcrypt');

// const password = 'ExamplePass@2023'; // Mot de passe répondant aux critères
// bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//         console.error('Erreur lors du hachage du mot de passe:', err);
//     } else {
//         console.log('Mot de passe haché:', hash);
//     }
// });