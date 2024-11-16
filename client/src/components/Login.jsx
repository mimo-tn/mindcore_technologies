// // Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';

// export default function Login({ onLogin }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setError(null); // Réinitialise l'erreur

//         try {
//             // Envoie de la requête de connexion avec les informations de l'utilisateur
//             const response = await axios.post('http://localhost:5000/api/login', { login: username, password: password });
//             console.log(response.data);
//             const { privilege, departement_idDepartement, login } = response.data;

//             // Stocke les informations dans le localStorage
//             localStorage.setItem('privilege', privilege);
//             localStorage.setItem('departement_idDepartement', departement_idDepartement);
//             localStorage.setItem('username', login);

//             // Appelle onLogin avec les informations de l'utilisateur
//             onLogin(privilege, departement_idDepartement, login);

//             // Redirige en fonction du privilège
//             if (privilege === 'admin') {
//                 navigate('/feuille-de-temps');
//             } else if (privilege === 'user') {
//                 navigate('/user-dashboard');
//             } else {
//                 navigate('/'); // Redirection par défaut
//             }
//         } catch (error) {
//             setError('Identifiants invalides. Veuillez réessayer.');
//         }
//     };

//     return (
//         <Paper style={{ padding: '2em', maxWidth: 400, margin: 'auto', marginTop: '5em' }}>
//             <Box component="form" onSubmit={handleSubmit}>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                     Connexion
//                 </Typography>
//                 {error && (
//                     <Typography color="error" variant="body2">
//                         {error}
//                     </Typography>
//                 )}
//                 <TextField
//                     label="Nom d'utilisateur"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     label="Mot de passe"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     required
//                 />
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                     Se connecter
//                 </Button>
//             </Box>
//         </Paper>
//     );
// }
//Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:5000/api/login', { login: username, password });
            const { privilege, departement, login, token } = response.data;
    
            // Stocker le token dans localStorage
            localStorage.setItem('token', token); // Assurez-vous que le token est bien stocké
    
            // Stocker aussi les autres informations dans sessionStorage
            sessionStorage.setItem('privilege', privilege);
            sessionStorage.setItem('department', departement);
            sessionStorage.setItem('username', login);
    
            onLogin(privilege, departement, login);
    
            // Rediriger selon le privilège
            navigate(privilege === 'admin' ? '/feuille-de-temps' : '/user-dashboard');
        } catch (error) {
            setError('Identifiants invalides. Veuillez réessayer.');
        }
    };
    
    return (
        <Paper style={{ padding: '2em', maxWidth: 400, margin: 'auto', marginTop: '5em' }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Connexion
                </Typography>
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <TextField
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Se connecter
                </Button>
            </Box>
        </Paper>
    );
}
