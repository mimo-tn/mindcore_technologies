//users.controllers.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.FIRST_SECRET_KEY; // Replace with a secure secret key
const Departement = require('../models/departement.model'); // Importez le modèle Departement
// Créer un utilisateur
exports.createUser = async (req, res) => {
    try {
        const { password, ...otherFields } = req.body;

        if (!password) return res.status(400).json({ error: 'Le mot de passe est requis.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            ...otherFields,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user.id });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur', details: error.message });
    }
};

// Récupérer tous les utilisateurs
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Departement,
                as: 'departement',
                attributes: ['nomDepartement'] // Ne sélectionnez que les colonnes nécessaires
            }
        });
        res.json({ users });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error });
    }
};

// Récupérer un utilisateur par ID
exports.findOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération de l\'utilisateur', details: error });
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            res.json({ message: 'Utilisateur mis à jour avec succès' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error });
    }
};
// Connexion et génération du JWT
exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, privilege: user.privilege },
                secretKey,
                { expiresIn: '1h' }
            );

            // Stockage du JWT dans un cookie sécurisé (si tu veux)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // Dépend de l'environnement (True pour HTTPS)
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000 // 1 heure
            });

            // Retourner le token dans la réponse
            res.json({
                message: 'Connexion réussie',
                nom: user.nom,
                prenom:user.prenom,
                login: user.login,
                privilege: user.privilege,
                department: user.departement_idDepartement,

                token: token, // Ajouter le token à la réponse
            });
        } else {
            res.status(401).json({ error: 'Login ou mot de passe invalide' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur de connexion', details: error });
    }
};
// Middleware de vérification du JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token depuis l'en-tête Authorization

    if (!token) return res.status(403).json({ error: 'Pas de token fourni' });

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) return res.status(401).json({ error: 'Token invalide ou expiré' }); // Erreur de token invalide
        req.userId = decoded.id;
        req.userPrivilege = decoded.privilege;
        next();
    });
};
