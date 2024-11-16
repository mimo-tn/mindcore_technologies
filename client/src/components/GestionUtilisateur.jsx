//GestionUtilisateur.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Import de DataGrid
import { styled } from '@mui/material/styles';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Texte de l'interface utilisateur en français pour DataGrid
const localeTextFrench = {
    // Texte par défaut
    noRowsLabel: 'Aucune ligne',
    noResultsOverlayLabel: 'Aucun résultat trouvé.',
    errorOverlayDefaultLabel: 'Une erreur est survenue.',
  
    // Barre d'outils
    toolbarDensity: 'Densité',
    toolbarDensityLabel: 'Densité',
    toolbarDensityCompact: 'Compacte',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Confortable',
    toolbarColumns: 'Colonnes',
    toolbarColumnsLabel: 'Sélectionner les colonnes',
    toolbarFilters: 'Filtres',
    toolbarFiltersLabel: 'Voir les filtres',
    toolbarFiltersTooltipHide: 'Cacher les filtres',
    toolbarFiltersTooltipShow: 'Montrer les filtres',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filtres actifs` : `${count} filtre actif`,
    toolbarExport: 'Exporter',
    toolbarExportLabel: 'Exporter',
    toolbarExportCSV: 'Télécharger en CSV',
  
    // Menus de colonnes
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Afficher les colonnes',
    columnMenuManageColumns: 'Gérer les colonnes',
    columnMenuFilter: 'Filtrer',
    columnMenuHideColumn: 'Masquer',
    columnMenuUnsort: 'Annuler le tri',
    columnMenuSortAsc: 'Trier par ASC',
    columnMenuSortDesc: 'Trier par DESC',
  
    // Fenêtre de filtre
    filterPanelAddFilter: 'Ajouter un filtre',
    filterPanelDeleteIconLabel: 'Supprimer',
    filterPanelOperators: 'Opérateurs',
    filterPanelOperatorAnd: 'Et',
    filterPanelOperatorOr: 'Ou',
    filterPanelColumns: 'Colonnes',
    filterPanelInputLabel: 'Valeur',
    filterPanelInputPlaceholder: 'Valeur du filtre',
  
    // Opérateurs de filtre
    filterOperatorContains: 'contient',
    filterOperatorEquals: 'égal à',
    filterOperatorStartsWith: 'commence par',
    filterOperatorEndsWith: 'se termine par',
    filterOperatorIs: 'est',
    filterOperatorNot: 'n\'est pas',
    filterOperatorAfter: 'après',
    filterOperatorOnOrAfter: 'le ou après',
    filterOperatorBefore: 'avant',
    filterOperatorOnOrBefore: 'le ou avant',
    filterOperatorIsEmpty: 'est vide',
    filterOperatorIsNotEmpty: 'n\'est pas vide',
    filterOperatorIsAnyOf: 'est l\'un de',
  
    // Fenêtre de colonne
    columnsPanelTextFieldLabel: 'Rechercher une colonne',
    columnsPanelTextFieldPlaceholder: 'Nom de la colonne',
    columnsPanelDragIconLabel: 'Réorganiser la colonne',
    columnsPanelShowAllButton: 'Afficher tout',
    columnsPanelHideAllButton: 'Masquer tout',
  
    // Footer
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} lignes sélectionnées`
        : `${count.toLocaleString()} ligne sélectionnée`,
    footerTotalRows: 'Total des lignes :',
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
    footerPaginationRowsPerPage: 'Lignes par page :', // Ajout de la traduction pour "Rows per page:"
  };  

export default function ThreeBlockLayout() {
  const [users, setUsers] = useState([]);
  //const [mindcore, setMindcores] = useState([]);
  //const [loaded, setLoaded] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    login: '',
    password: '',
    confirmPassword: '',
    privilege: '',
    departement: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [searchLogin, setSearchLogin] = useState('');
  const [departements, setDepartements] = useState([]);
  //const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'login', headerName: 'Login', width: 180 },
    { field: 'privilege', headerName: 'Privilège', width: 130 },
    { field: 'departement', headerName: 'Département', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
          Modifier
        </Button>
      ),
    },
  ];
  useEffect(() => {
    // Charger la liste des départements
    axios.get('http://localhost:5000/api/departements')
        .then(res => {
            setDepartements(res.data.departements || []);
        })
        .catch(err => {
            console.error("Erreur lors du chargement des départements :", err);
            alert('Erreur lors du chargement des départements');
        });

    // Charger les utilisateurs (existant dans votre code)
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    if (token) {
        axios.get('http://localhost:5000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
            },
        })
        .then(res => {
            const data = res.data.users || [];
            console.log(data);
            const flattenedData = data.map(item => ({
                id: item.id,
                prenom: item.prenom,
                nom: item.nom,
                login: item.login,
                privilege: item.privilege,
                departement: item.departement ? item.departement.nomDepartement : 'N/A' // Inclure le nom du département
            }));
            setUsers(flattenedData);
            setFilteredUsers(flattenedData);
        })
        .catch(err => {
            console.error("Erreur détaillée :", err);
            alert('Erreur lors du chargement des utilisateurs');
        });
    } else {
        alert('Veuillez vous connecter');
    }
}, []);



  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      Object.values(user).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredUsers(filtered);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (formData.password === formData.confirmPassword) {
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
      setFilteredUsers([...users, newUser]);
      handleReset();
    } else {
      alert('Les mots de passe ne correspondent pas');
    }
  };

  const handleReset = () => {
    setFormData({
      prenom: '',
      nom: '',
      login: '',
      password: '',
      confirmPassword: '',
      privilege: '',
      departement: '',
    });
    setEditMode(false);
    //setSelectedUser(null);
  };

  const handleSearch = () => {
    const userToEdit = users.find(user => user.login === searchLogin);
    if (userToEdit) {
      setFormData(userToEdit);
      //setSelectedUser(userToEdit);
      setEditMode(true);
    } else {
      alert("Utilisateur non trouvé");
    }
  };

  const handleEdit = () => {
    setUsers(users.map(user => user.login === formData.login ? formData : user));
    setFilteredUsers(users.map(user => user.login === formData.login ? formData : user));
    handleReset();
  };
  const handleEditClick = (user) => {
    setFormData({
        ...user,
        departement: departements.find(dept => dept.nomDepartement === user.departement)?.idDepartement || ''
    });
    setEditMode(true);
};


  // const handleEditClick = (user) => {
  //   setFormData(user);
  //   //setSelectedUser(user);
  //   setEditMode(true);
  // };

  return (
    <Box sx={{ width: '100vw', height: '100vh', padding: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2, height: '730px' }}>
        <Box>
          <Item>
            <Typography variant="h6">{editMode ? 'Modifier utilisateur' : 'Créer utilisateur'}</Typography>
            <TextField label="Nom" name="nom" value={formData.nom} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Login" name="login" value={formData.login} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Mot de passe" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Confirmer mot de passe" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Privilège" name="privilege" value={formData.privilege} onChange={handleChange} select fullWidth margin="normal">
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Utilisateur">Utilisateur</MenuItem>
            </TextField>
            <TextField
              label="Département"
              name="departement"
              value={formData.departement}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
            >
              {departements.map(dept => (
                  <MenuItem key={dept.idDepartement} value={dept.idDepartement}>
                      {dept.nomDepartement}
                  </MenuItem>
              ))}
          </TextField>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={editMode ? handleEdit : handleCreate}>
              {editMode ? 'Modifier utilisateur' : 'Créer utilisateur'}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleReset}>
              Annuler
            </Button>
          </Item>
        </Box>

        <Box>
          <Item>
            <Typography variant="h6">Rechercher utilisateur</Typography>
            <TextField label="Recherche par Login" value={searchLogin} onChange={(e) => setSearchLogin(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSearch}>
              Rechercher
            </Button>
          </Item>
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: 'calc(50vh - 20px)', overflow: 'auto' }}>
        <Item>
          <Typography variant="h6" gutterBottom>Liste des utilisateurs</Typography>
          <TextField
            label="Rechercher un Utilisateur"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={searchTerm ? filteredUsers : users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
              localeText={localeTextFrench} // Texte en français
            />
          </Paper>
        </Item>
      </Box>
    </Box>
  );
}
