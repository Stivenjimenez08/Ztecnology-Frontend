import React,{useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import axios from "axios";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListQuotes = ({load, setIdUpdate, setIdDelete}) => {
    
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/Quote/consultQuote`)
      console.log(response)
      setRows(response.data.Quotes)
    }
    fetchData()
  },[load])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = async(id) =>{
    setIdUpdate(id);
  }
  const handleDelete = async(id) =>{
    setIdDelete(id);
  }

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>serial</TableCell>
                <TableCell>producto</TableCell>
                <TableCell>cantidad</TableCell>
                <TableCell>descuento</TableCell>
                <TableCell>usuario</TableCell>
                <TableCell>subtotal</TableCell>
                <TableCell>total</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return(
                    <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.customer.names}</TableCell>
                    <TableCell>{row.serial}</TableCell>
                    <TableCell>{row.product.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.discount}</TableCell>
                    <TableCell>{row.user.names}</TableCell>
                    <TableCell>{row.subTotal}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>
                      <IconButton id='btnEdit' aria-label='Editar' onClick={()=>{handleEdit(row.id)}}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  )
                })} 
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="contbtn">
        <Button id='btn'>Crear cotizacion</Button>
      </div>
    </div>
  );
};

export default ListQuotes;
