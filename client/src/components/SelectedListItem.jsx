// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box'; 
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

// export default function SelectedListItem() {
//     const navigate = useNavigate();

//     const handleListItemClick = (path) => {
//         navigate(path);
//     };

//     return (
//         <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         <List component="nav" aria-label="main mailbox folders">
//             <ListItemButton onClick={() => handleListItemClick('/inbox')}>
//             <ListItemIcon><InboxIcon /></ListItemIcon>
//             <ListItemText primary="Inbox" />
//             </ListItemButton>
//             <ListItemButton onClick={() => handleListItemClick('/drafts')}>
//             <ListItemIcon><DraftsIcon /></ListItemIcon>
//             <ListItemText primary="Drafts" />
//             </ListItemButton>
//         </List>
//         <Divider />
//         <List component="nav" aria-label="secondary mailbox folder">
//             <ListItemButton onClick={() => handleListItemClick('/trash')}>
//             <ListItemText primary="Trash" />
//             </ListItemButton>
//             <ListItemButton onClick={() => handleListItemClick('/spam')}>
//             <ListItemText primary="Spam" />
//             </ListItemButton>
//         </List>
//         </Box>
//     );
// }
import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import SpamIcon from '@mui/icons-material/Report';

export default function SelectedListItem({ collapsed }) {
    const navigate = useNavigate();

    const handleListItemClick = (path) => {
        navigate(path);
    };

    return (
        <div style={{ width: collapsed ? 60 : 240, transition: 'width 0.3s' }}>
            <List>
                <ListItem button onClick={() => handleListItemClick('/inbox')}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={!collapsed && 'Inbox'} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick('/drafts')}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={!collapsed && 'Drafts'} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick('/trash')}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary={!collapsed && 'Trash'} />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick('/spam')}>
                    <ListItemIcon>
                        <SpamIcon />
                    </ListItemIcon>
                    <ListItemText primary={!collapsed && 'Spam'} />
                </ListItem>
            </List>
        </div>
    );
}
