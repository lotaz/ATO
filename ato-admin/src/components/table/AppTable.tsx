import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { TAppTable } from './types';

export default function AppTable({ columns, rows, rowKey, handleViewDetails, handleUpdate }: TAppTable) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={`column-${-1}`} align="center" style={{ width: 20 }}>
                #
              </TableCell>
              {columns.map((column, index: number) => (
                <TableCell key={`column-${index}`} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell key={`column-${999}`} align="center" style={{ width: 100 }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ cursor: 'pointer' }}>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={`row-${index}`}>
                  <TableCell key={`record-${-1}`} align="center" style={{ width: 20 }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map((column, index: number) => {
                    const value = row[column?.id];
                    return (
                      <TableCell onClick={() => handleViewDetails(row[rowKey])} key={`record-${index}`} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell key={`record-${999}`} style={{ width: 100 }}>
                    <Stack direction={'row'} justifyContent={'center'}>
                      <Button onClick={() => handleViewDetails(row[rowKey])}>
                        <EyeOutlined />
                      </Button>
                      <Button onClick={() => handleUpdate(row[rowKey])}>
                        <EditOutlined />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
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
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
      />
    </Paper>
  );
}
