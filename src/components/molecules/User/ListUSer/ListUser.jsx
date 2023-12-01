import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { IconButton } from '@mui/material';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ListUSer.css'

const ListUser = ({load, setIdUpdate, setIdDelete}) => {
    
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const user = useSelector(state => state.auth.user)

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/User/consultUser`)
      setRows(response.data.users)
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
                <TableCell align="center"><strong>ID</strong></TableCell>
                <TableCell align="center"><strong>Nombres</strong></TableCell>
                <TableCell align="center"><strong>Apellidos</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Rol</strong></TableCell>
                {user.idRol==1 && <TableCell align="center"><strong>Acciones</strong></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
               {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return(
                    <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.names}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.role.name}</TableCell>
                    {user.idRol==1 && <TableCell align="center">
                      
                      <IconButton id='btnEdit' aria-label='Editar' onClick={()=>{handleEdit(row.id)}}>
                        <EditIcon/>
                      </IconButton>

                      <IconButton id='btnDelete' aria-label='Eliminar' onClick={()=>{handleDelete(row.id)}}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                    }
                  
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
        <Button id='btn'>Crear Usuario</Button>
      </div> */}
    </div>
  );
};

export default ListUser;
