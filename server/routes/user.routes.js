//user.routes.js
////////////////const express = require('express');
////////////////const router = express.Router();
////////////////const userController = require('../controllers/users.controller');

// Authentication route
////////////////router.post('/login', userController.login);


// Définition des routes pour chaque action CRUD
// router.get('/users', userController.findAllUsers);
// router.get('/users/:id', userController.findOneUser);
// router.post('/users/create', userController.createUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);


// Routes accessible by all authenticated users
////////////////router.get('/users', userController.verifyToken, userController.findAllUsers);
////////////////router.get('/users/:id', userController.verifyToken, userController.findOneUser);

// router.post('/users/create',  userController.createUser);
// Admin-only routes
//////////////// router.post('/users/create', userController.verifyToken, (req, res, next) => {
////////////////     if (req.userPrivilege === 'admin') return next();
////////////////     res.status(403).json({ error: 'Access forbidden: Admins only' });
//////////////// }, userController.createUser);

////////////////module.exports = router;
//user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// Route de connexion (authentification)
router.post('/login', userController.login);

// Routes CRUD protégées par le JWT
router.get('/users', userController.verifyToken, userController.findAllUsers);
router.get('/users/:id', userController.verifyToken, userController.findOneUser);

// Route de création d'utilisateur accessible seulement aux administrateurs
router.post('/users/create', userController.verifyToken, (req, res, next) => {
    if (req.userPrivilege === 'admin') return next();
    res.status(403).json({ error: 'Accès interdit: seulement pour les administrateurs' });
}, userController.createUser);

module.exports = router;
