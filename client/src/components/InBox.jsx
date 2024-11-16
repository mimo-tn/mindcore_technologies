//code pour afficher a partir du back-end

// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { PageContainer, PageContainerToolbar } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import PrintIcon from '@mui/icons-material/Print';
// import DownloadIcon from '@mui/icons-material/Download';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// const Skeleton = styled('div')(({ theme, height }) => ({
//     backgroundColor: theme.palette.action.hover,
//     borderRadius: theme.shape.borderRadius,
//     height,
//     content: '" "',
// }));

// function PageToolbar() {
//     return (
//         <PageContainerToolbar>
//             <Stack direction="row" spacing={1} alignItems="center">
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     color="neutral"
//                     startIcon={<DownloadIcon fontSize="inherit" />}
//                 >
//                     Download
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     color="neutral"
//                     startIcon={<PrintIcon fontSize="inherit" />}
//                 >
//                     Print
//                 </Button>
//             </Stack>
//         </PageContainerToolbar>
//     );
// }

// const columns = [
//     { field: '_id', headerName: 'ID', width: 70 },
//     {
//         field: 'category',
//         headerName: 'Category',
//         description: 'Combines thing and description',
//         sortable: true,
//         width: 160,
//         // valueGetter: (params) => `${params.row.thing || ''} ${params.row.description || ''}`
//     },
//     { field: 'description', headerName: 'Description', width: 130 },
//     {
//         field: 'likes',
//         headerName: 'Likes',
//         type: 'number',
//         width: 90
//     },
//     { 
//         field: 'thing',
//         headerName: 'Thing',
//         // valueGetter: (params) => params.row?.thing || 'N/A', // Use 'N/A' or any default value when 'thing' is undefined
//         width: 130 
//     }
// ];

// const paginationModel = { page: 0, pageSize: 5 };

// export default function InBox({ content }) {
//     const theme = useTheme();
//     const router = { pathname: '/inbox', navigate: () => {} };
//     const [mindcore, setMindcores] = useState([]);
//     const [loaded, setLoaded] = useState(false);

//     useEffect(() => {
//         axios.get("http://localhost:8000/")
//             .then(res => {
//                 console.log(res.data);
//                 setMindcores(res.data.mindcores || []);
//                 setLoaded(true);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, []);

//     return (
//         <AppProvider
//             navigation={[{ segment: content, title: content }]}
//             router={router}
//             theme={theme}
//             branding={{
//                 title: 'ACME Inc.',
//             }}
//         >
//             <Paper sx={{ p: 2, width: '100vw', height: '100vh', overflow: 'auto', borderRadius: 0 }}>
//                 <PageContainer
//                     slots={{
//                         toolbar: PageToolbar,
//                     }}
//                 >
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <Typography variant="h4">{content}</Typography>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Typography variant="body1">
//                                 Here is some introductory content about the inbox and its functions.
//                             </Typography>
//                         </Grid>

//                         <Grid item xs={12}>
//                             {loaded ? (
//                                 <DataGrid
//                                     rows={mindcore}
//                                     columns={columns}
//                                     getRowId={(row) => row._id} // Use _id as the unique row identifier
//                                     initialState={{ pagination: { paginationModel } }}
//                                     pageSizeOptions={[5, 10]}
//                                     checkboxSelection
//                                     sx={{ border: 0 }}
//                                 />
//                             ) : (
//                                 <Skeleton height={400} /> // Placeholder while loading
//                             )}
//                         </Grid>

//                         <Grid item xs={4}>
//                             <Skeleton height={100} />
//                             <img
//                                 src="logo192.png"
//                                 alt="ACME Inc. Logo"
//                                 style={{ width: '100%', marginTop: 8 }}
//                             />
//                         </Grid>

//                         <Grid item xs={8}>
//                             <Typography variant="body2">
//                                 Additional details or description can go here to explain the content displayed.
//                             </Typography>
//                         </Grid>
//                     </Grid>
//                 </PageContainer>
//             </Paper>
//         </AppProvider>
//     );
// }


// code pour afficher a partir d'une API

import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { PageContainer, PageContainerToolbar } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

function PageToolbar() {
    return (
        <PageContainerToolbar>
            <Stack direction="row" spacing={1} alignItems="center">
                <Button
                    variant="outlined"
                    size="small"
                    color="neutral"
                    startIcon={<DownloadIcon fontSize="inherit" />}
                >
                    Download
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    color="neutral"
                    startIcon={<PrintIcon fontSize="inherit" />}
                >
                    Print
                </Button>
            </Stack>
        </PageContainerToolbar>
    );
}

export default function InBox({ content }) {
    const theme = useTheme();
    const router = { 
        pathname: '/inbox', 
        navigate: () => {}, 
        searchParams: new URLSearchParams() // Adding a default empty searchParams
    };
    // const router = { pathname: '/inbox', navigate: () => {} };
    const [mindcore, setMindcores] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        axios.get("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
            .then(res => {
                const data = res.data || [];
                
                // Flatten the data for each entry
                const flattenedData = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    intelligence: item.powerstats?.intelligence || 'N/A',
                    strength: item.powerstats?.strength || 'N/A',
                    fullName: item.biography?.fullName || 'No data',
                    publisher: item.biography?.publisher || 'No data'
                }));
                
                setMindcores(flattenedData); // Set the flattened data to rows
    
                const dynamicColumns = [
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Name', width: 150 },
                    { field: 'intelligence', headerName: 'Intelligence', width: 130 },
                    { field: 'strength', headerName: 'Strength', width: 130 },
                    { field: 'fullName', headerName: 'Full Name', width: 150 },
                    { field: 'publisher', headerName: 'Publisher', width: 150 },
                ];
                
                setColumns(dynamicColumns);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    

    return (
        <AppProvider
            navigation={[{ segment: content, title: content }]}
            router={router}
            theme={theme}
            branding={{
                title: 'ACME Inc.',
            }}
        >
            <Paper sx={{ p: 2, width: '100vw', height: '100vh', overflow: 'auto', borderRadius: 0 }}>
                <PageContainer
                    slots={{
                        toolbar: PageToolbar,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{content}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Here is some introductory content about the inbox and its functions.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            {loaded ? (
                                <DataGrid
                                    rows={mindcore}
                                    columns={columns}
                                    getRowId={(row) => row.id} // Utiliser 'id' comme identifiant unique
                                    pageSize={pageSize}
                                    pageSizeOptions={[5, 10]}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    checkboxSelection
                                    sx={{ border: 0 }}
                                />
                            ) : (
                                <Skeleton height={400} > Loading... </Skeleton>// Placeholder while loading
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            <Skeleton height={100} />
                            <img
                                src="logo192.png"
                                alt="ACME Inc. Logo"
                                style={{ width: '100%', marginTop: 8 }}
                            />
                        </Grid>

                        <Grid item xs={8}>
                            <Typography variant="body2">
                                Additional details or description can go here to explain the content displayed.
                            </Typography>
                        </Grid>
                    </Grid>
                </PageContainer>
            </Paper>
        </AppProvider>
    );
}