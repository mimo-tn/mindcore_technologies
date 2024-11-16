//departement.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');  // Assurez-vous que ce fichier est bien importé

// Création du modèle Departement
const Departement = sequelize.define('Departement', {
    idDepartement: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-incrémenté pour la clé primaire
        allowNull: false,
    },
    nomDepartement: {
        type: DataTypes.STRING,
        allowNull: false,  // Nom du département requis
        validate: {
            notEmpty: {
                msg: 'Le nom du département ne peut pas être vide'
            },
            notNull: {
                msg: 'Le nom du département est requis'
            }
        }
    },
    logo: {
        type: DataTypes.STRING,  // Type VARCHAR pour le chemin de l'image ou URL du logo
        allowNull: true,  // Le logo est optionnel
        validate: {
            isUrl: {
                msg: 'Le logo doit être une URL valide'
            }
        }
    },
    titre: {
        type: DataTypes.STRING,  // Type VARCHAR pour le titre du département
        allowNull: true,  // Titre optionnel
    }
}, {
    tableName: 'Departement',  // Nom de la table dans la base de données
    timestamps: false,  // Pas de champs `createdAt` ou `updatedAt`
});

module.exports = Departement;
