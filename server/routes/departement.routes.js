//departement.routes.js
const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departement.controller');

// Récupérer tous les départements
router.get('/departements', departementController.findAllDepartements);

// Récupérer un département par ID
router.get('/departements/:id', departementController.findOneDepartement);

// Créer un nouveau département
router.post('/departements', departementController.createDepartement);

// Mettre à jour un département
router.put('/departements/:id', departementController.updateDepartement);

// Supprimer un département
router.delete('/departements/:id', departementController.deleteDepartement);

module.exports = router;
