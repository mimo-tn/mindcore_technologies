// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//             <Toolbar>
//             <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ mr: 2 }}
//             >
//                 <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 <img
//                     src="mainlogo.png"
//                     alt="mainlogo Image"
//                     style={{ width: '20%', marginTop: 8 }}
//                 />
//             </Typography>
//             <Button color="inherit">Login</Button>
//             </Toolbar>
//         </AppBar>
//         </Box>
//     );
// }

// ButtonAppBar.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar({ onToggle, onLogout, user }) {
    const [collapsed, setCollapsed] = useState(false);
    console.log("salllllllluu", user)
    const handleToggle = () => {
        setCollapsed(!collapsed);
        if (onToggle) onToggle(); // Appelle la fonction de basculement si nécessaire
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img
                            src="mainlogo.png"
                            alt="mainlogo Image"
                            style={{ width: '20%', marginTop: 8 }}
                        />
                    </Typography>
                    {user && (
                        <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
                            {user}
                        </Typography>
                    )}
                    <Button color="inherit" onClick={onLogout}>
                        {user ? 'Logout' : 'Login'}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

