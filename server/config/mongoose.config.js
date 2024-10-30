const mongoose = require("mongoose");
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const uri = `mongodb+srv://${username}:${pw}@cluster0.8bbpt.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
        .then(() => console.log("connection établie avec succès"))
        .catch(err => console.log("une erreur s'est produit lors de la connexion à la base de données", err))