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

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import SpamIcon from '@mui/icons-material/Report';

export default function ButtonAppBar({ onToggle }) {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
        if (onToggle) onToggle(); // Call the toggle function from parent if needed
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
