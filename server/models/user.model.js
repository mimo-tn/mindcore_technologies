// module user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Departement = require('./departement.model'); // Assurez-vous que le modèle est importé


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Departement_idDepartement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'le département est requis'
            }
        }
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Le nom est requis'
            }
        }
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Le prénom est requis'
            }
        }
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Le login est requis'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Le mot de passe est requis'
            },
            len: {
                args: [12],
                msg: 'Le mot de passe doit comporter au moins 12 caractères'
            },
            isStrongPassword(value) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!regex.test(value)) {
                    throw new Error(
                        'Le mot de passe doit comporter au moins 12 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                    );
                }
            }
        }
    },
    privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Le privilège est requis'
            }
        }
    }
}, {
    tableName: 'Users',
    timestamps: false,
});
User.belongsTo(Departement, {
    foreignKey: 'Departement_idDepartement',
    as: 'departement'
});

module.exports = User;
