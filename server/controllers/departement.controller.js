//departement.controller.js
const Departement = require('../models/departement.model');

// Récupérer tous les départements
exports.findAllDepartements = async (req, res) => {
    try {
        const departements = await Departement.findAll();
        res.json({ departements });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération des départements', details: error });
    }
};

// Récupérer un département par ID
exports.findOneDepartement = async (req, res) => {
    try {
        const departement = await Departement.findByPk(req.params.id);
        if (!departement) {
            return res.status(404).json({ error: 'Département non trouvé' });
        }
        res.json({ departement });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la récupération du département', details: error });
    }
};

// Créer un département
exports.createDepartement = async (req, res) => {
    try {
        const { nomDepartement, logo, titre } = req.body;
        if (!nomDepartement) {
            return res.status(400).json({ error: 'Le nom du département est requis' });
        }

        const departement = await Departement.create({ nomDepartement, logo, titre });
        res.status(201).json({ message: 'Département créé avec succès', departementId: departement.idDepartement });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du département', details: error.message });
    }
};

// Mettre à jour un département
exports.updateDepartement = async (req, res) => {
    try {
        const { nomDepartement, logo, titre } = req.body;
        const updated = await Departement.update({ nomDepartement, logo, titre }, {
            where: { idDepartement: req.params.id },
        });
        
        if (updated[0] === 0) {
            return res.status(404).json({ error: 'Département non trouvé' });
        }

        res.json({ message: 'Département mis à jour avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour du département', details: error.message });
    }
};

// Supprimer un département
exports.deleteDepartement = async (req, res) => {
    try {
        const deleted = await Departement.destroy({ where: { idDepartement: req.params.id } });
        if (deleted === 0) {
            return res.status(404).json({ error: 'Département non trouvé' });
        }
        res.json({ message: 'Département supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression du département', details: error });
    }
};
