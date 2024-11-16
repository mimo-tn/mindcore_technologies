//feuilledetemps.jsx
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { PageContainer } from '@toolpad/core/PageContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface Column {
  id: 'Date' | 'Type' | 'Lieu' | 'Heure Début' | 'Début Diner' | 'Fin Diner' | 'Heure Fin' | 'Heure Totale' | 'Justification';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Type', label: 'Type', minWidth: 100 },
  { id: 'Lieu', label: 'Lieu', minWidth: 100 },
  { id: 'Heure Début', label: 'Heure Début', minWidth: 100 },
  { id: 'Début Diner', label: 'Début Diner', minWidth: 100 },
  { id: 'Fin Diner', label: 'Fin Diner', minWidth: 100 },
  { id: 'Heure Fin', label: 'Heure Fin', minWidth: 100 },
  { id: 'Heure Totale', label: 'Heure Totale', minWidth: 100, align: 'right' },
  { id: 'Justification', label: 'Justification', minWidth: 200, align: 'left' },
];

function createData() {
  const now = new Date();
  return {
    Date: now.toLocaleDateString(),
    Type: 'REG',
    Lieu: 'Bureau',
    HeureDébut: now.toLocaleTimeString(),
    DébutDiner: '',
    FinDiner: '',
    HeureFin: '',
    HeureTotale: '',
    Justification: '',  // Initialiser la justification vide
  };
}

export default function FeuilleDeTemps({ content }) {
  const theme = useTheme();
  const [rows, setRows] = useState([createData()]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (rowIndex: number, columnId: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnId] = value;
    setRows(updatedRows);
  };

  const calculateTotalTime = (start: string, end: string, breakStart: string, breakEnd: string) => {
    const startTime = new Date(`1970-01-01T${start}:00Z`).getTime();
    const endTime = new Date(`1970-01-01T${end}:00Z`).getTime();
    const breakStartTime = breakStart ? new Date(`1970-01-01T${breakStart}:00Z`).getTime() : 0;
    const breakEndTime = breakEnd ? new Date(`1970-01-01T${breakEnd}:00Z`).getTime() : 0;

    // Calculer la différence de temps en millisecondes
    const totalTime = (endTime - startTime - (breakEndTime - breakStartTime)) / (1000 * 60 * 60); // Convertir en heures
    return totalTime > 0 ? totalTime : 0; // S'assurer que le temps est positif
  };

  const handleTimeChange = (rowIndex: number, columnId: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnId] = value;

    // Si l'heure de début, de fin et de pause sont tous remplis, calculer l'heure totale
    if (
      updatedRows[rowIndex].HeureDébut &&
      updatedRows[rowIndex].HeureFin
    ) {
      const totalTime = calculateTotalTime(
        updatedRows[rowIndex].HeureDébut,
        updatedRows[rowIndex].HeureFin,
        updatedRows[rowIndex].DébutDiner,
        updatedRows[rowIndex].FinDiner
      );
      updatedRows[rowIndex].HeureTotale = totalTime.toFixed(2);
    }

    setRows(updatedRows);
  };

  return (
    <AppProvider theme={theme}>
      <Paper sx={{ p: 2, width: '100%', borderRadius: 0 }}>
        <PageContainer>
          <div style={{ padding: '20px' }}>
            <h2>{content}</h2>
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'Date' ? (
                          row[column.id]
                        ) : column.id === 'Type' || column.id === 'Lieu' ? (
                          <FormControl fullWidth>
                            <InputLabel>{column.label}</InputLabel>
                            <Select
                              value={row[column.id]}
                              onChange={(e) => handleChange(rowIndex, column.id, e.target.value)}
                              label={column.label}
                            >
                              {column.id === 'Type' ? (
                                <>
                                  <MenuItem value="FER">FER</MenuItem>
                                  <MenuItem value="REG">REG</MenuItem>
                                </>
                              ) : (
                                <>
                                  <MenuItem value="Bureau">Bureau</MenuItem>
                                  <MenuItem value="Usine">Usine</MenuItem>
                                </>
                              )}
                            </Select>
                          </FormControl>
                        ) : column.id === 'Justification' ? (
                          // Colonne Justification avec TextareaAutosize
                          <TextareaAutosize
                            minRows={3}
                            value={row[column.id]}
                            onChange={(e) => handleChange(rowIndex, column.id, e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', resize: 'vertical' }}
                          />
                        ) : (
                          <TextField
                            type="time"
                            value={row[column.id]}
                            onChange={(e) => handleTimeChange(rowIndex, column.id, e.target.value)}
                            fullWidth
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
