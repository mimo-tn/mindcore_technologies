// // App.js
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import ButtonAppBar from './components/ButtonAppBar';
// import SelectedListItem from './components/SelectedListItem';
// import PageContainerBasic from './components/PageContainerBasic';
// import InBox from './components/InBox';
// import Login from './components/Login';
// import FeuilleDeTemps from './components/FeuilleDeTemps';

// export default function App() {
//     const [privilege, setPrivilege] = useState(null);
//     const [department, setDepartment] = useState(null);
//     const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const navigate = useNavigate();

//     // Fonction pour la déconnexion
//     const handleLogout = () => {
//         setPrivilege(null);
//         setDepartment(null);
//         setUser(null);
//         // Suppression des informations du localStorage
//         localStorage.removeItem('privilege');
//         localStorage.removeItem('department');
//         localStorage.removeItem('username');
//         navigate('/login'); // Redirige vers la page de connexion
//     };

//     // Fonction d'authentification après la connexion réussie
//     const handleLogin = (privilege, department, username) => {
//         setPrivilege(privilege);
//         setDepartment(department);
//         setUser(username);
//     };

//     return (
//         <>
//             {privilege ? (
//                 <>
//                     <ButtonAppBar onToggle={() => setIsCollapsed(!isCollapsed)} onLogout={handleLogout} user={user} />
//                     <div style={{ display: 'flex', height: '100vh' }}>
//                         <SelectedListItem collapsed={isCollapsed} privilege={privilege} />
//                         <Routes>
//                             {privilege === 'admin' && (
//                                 <>
//                                     <Route path="/feuille-de-temps" element={<FeuilleDeTemps content="Feuille de Temps" />} />
//                                     <Route path="/manage-users" element={<PageContainerBasic content="Gérer les utilisateurs" />} />
//                                 </>
//                             )}
//                             {privilege === 'user' && (
//                                 <>
//                                     <Route path="/user-dashboard" element={<PageContainerBasic content="Tableau de bord de l'utilisateur" />} />
//                                     <Route path="/inbox" element={<InBox content="Boîte de réception" />} />
//                                 </>
//                             )}
//                             <Route path="*" element={<Navigate to={privilege === 'admin' ? '/feuille-de-temps' : '/user-dashboard'} />} />
//                         </Routes>
//                     </div>
//                 </>
//             ) : (
//                 <Routes>
//                     <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             )}
//         </>
//     );
// }
//App.js
//App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import SelectedListItem from './components/SelectedListItem';
import PageContainerBasic from './components/PageContainerBasic';
import InBox from './components/InBox';
import Login from './components/Login';
import FeuilleDeTemps from './components/FeuilleDeTemps';
import GestionUtilisateur from './components/GestionUtilisateur';
import './App.css';

const INACTIVITY_LIMIT = 100 * 60 * 1000; // 5 minutes en millisecondes

export default function App() {
    const [userData, setUserData] = useState({
        privilege: null,
        department: null,
        username: null,
    });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    let inactivityTimer;

    useEffect(() => {
        const storedPrivilege = sessionStorage.getItem('privilege');
        const storedDepartment = sessionStorage.getItem('department');
        const storedUsername = sessionStorage.getItem('username');

        if (storedPrivilege && storedDepartment && storedUsername) {
            setUserData({
                privilege: storedPrivilege,
                department: storedDepartment,
                username: storedUsername,
            });
        }

        resetInactivityTimer();
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);
        window.addEventListener('click', resetInactivityTimer);

        return () => {
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
            window.removeEventListener('click', resetInactivityTimer);
            clearTimeout(inactivityTimer);
        };
    }, []);

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(handleLogout, INACTIVITY_LIMIT);
    };

    const handleLogout = () => {
        setUserData({ privilege: null, department: null, username: null });
        sessionStorage.clear();
        navigate('/login');
    };

    const handleLogin = (privilege, department, username) => {
        setUserData({ privilege, department, username });
        sessionStorage.setItem('privilege', privilege);
        sessionStorage.setItem('department', department);
        sessionStorage.setItem('username', username);
        resetInactivityTimer();
    };

    return (
        <>
            {userData.privilege ? (
                <>
                    <ButtonAppBar onToggle={() => setIsCollapsed(!isCollapsed)} onLogout={handleLogout} user={userData.privilege} />
                    <div style={{ display: 'flex', height: '100vh' }}>
                        <SelectedListItem collapsed={isCollapsed} privilege={userData.privilege} />
                        <div className="content-container">
                            <Routes>
                                {userData.privilege === 'admin' && (
                                    <>
                                        <Route path="/feuille-de-temps" element={<FeuilleDeTemps content="Feuille de Temps" />} />
                                        <Route path="/manage-users" element={<PageContainerBasic content="Gérer les utilisateurs" />} />
                                    </>
                                )}
                                {userData.privilege === 'user' && (
                                    <>
                                        <Route path="/user-dashboard" element={<GestionUtilisateur content="Gestion des utilisateurs" />} />
                                        <Route path="/inbox" element={<InBox content="Boîte de réception" />} />
                                    </>
                                )}
                                <Route path="*" element={<Navigate to={userData.privilege === 'admin' ? '/feuille-de-temps' : '/user-dashboard'} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </>
    );
}
