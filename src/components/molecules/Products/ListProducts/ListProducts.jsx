import React,{useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import axios from "axios";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ListProducts = ({load, setIdUpdate}) => {
    
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/Product/consultProduct`)
      console.log(response)
      setRows(response.data.products)
    }
    fetchData()
  },[load])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
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
                <TableCell align="center"><strong>Nombre</strong></TableCell>
                <TableCell align="center"><strong>Descripcion</strong></TableCell>
                <TableCell align="center"><strong>Stock</strong></TableCell>
                <TableCell align="center"><strong>precio</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return(
                    <TableRow key={row.id}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.stock}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
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
      {/* <div className="contbtn">
        <Button id='btn'>Crear Producto</Button>
      </div> */}
    </div>
  );
};

export default ListProducts;
