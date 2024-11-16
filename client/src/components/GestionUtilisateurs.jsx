import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  InputAdornment,
  OutlinedInput,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { nom: 'John', prenom: 'Doe', login: 'jdoe', privilege: 'Admin', departement: 'IT' },
    { nom: 'Jane', prenom: 'Smith', login: 'jsmith', privilege: 'User', departement: 'HR' },
    // ... more users
  ]);

  const [newNom, setNewNom] = useState('');
  const [newPrenom, setNewPrenom] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPrivilege, setNewPrivilege] = useState('User'); // Default privilege
  const [newDepartement, setNewDepartement] = useState('IT'); // Default department

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event, field) => {
    switch (field) {
      case 'nom':
        setNewNom(event.target.value);
        break;
      case 'prenom':
        setNewPrenom(event.target.value);
        break;
      case 'login':
        setNewLogin(event.target.value);
        break;
      case 'privilege':
        setNewPrivilege(event.target.value);
        break;
      case 'departement':
        setNewDepartement(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleAddUser = () => {
    const newUser = {
      nom: newNom,
      prenom: newPrenom,
      login: newLogin,
      privilege: newPrivilege,
      departement: newDepartement,
    };
    setUsers([...users, newUser ]);
    setNewNom('');
    setNewPrenom('');
    setNewLogin('');
    setNewPrivilege('User ');
    setNewDepartement('IT');
  };

  const handleDeleteUser  = (login) => {
    setUsers(users.filter(user => user.login !== login));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">User  Management</Typography>
        </Toolbar>
      </AppBar> */}
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <OutlinedInput
            placeholder="Search Users"
            value={searchTerm}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Nom" value={newNom} onChange={(e) => handleInputChange(e, 'nom')} />
          <TextField label="Prénom" value={newPrenom} onChange={(e) => handleInputChange(e, 'prenom')} />
          <TextField label="Login" value={newLogin} onChange={(e) => handleInputChange(e, 'login')} />
          <Select value={newPrivilege} onChange={(e) => handleInputChange(e, 'privilege')}>
            <MenuItem value="User ">User </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
          <Select value={newDepartement} onChange={(e) => handleInputChange(e, 'departement')}>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            {/* Add more departments as needed */}
          </Select>
          <Button onClick={handleAddUser }>Add User</Button>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>Privilege</TableCell>
                <TableCell>Département</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.login}>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{user.privilege}</TableCell>
                  <TableCell>{user.departement}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteUser (user.login)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsersPage;