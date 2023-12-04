import React, {useEffect, useState} from 'react'
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Formik} from "formik";
import axios from "axios";
import * as yup from 'yup';

const UpdateUser = ({ idUpdate , load , setLoad }) => {

    const [formData, setFormData] = useState({})
    const [open, setOpen] =  useState(false);
    const user = useSelector(state => state.auth.user)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const consultUserById = async(id) =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/User/UserById/${id}`)
      setFormData(response.data.users)
    }
    useEffect(()=>{
        if(idUpdate){
            consultUserById(idUpdate);
        }
        setOpen(idUpdate ? true : false);
    },[idUpdate])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          enableReinitialize
          initialValues={{
            id: idUpdate,
            names: formData.names || '',
            lastName: formData.lastName || '',
            email: formData.email || '',
            password: '',
            idRol: formData.idRol ||''
          }}

          validationSchema={yup.object({
            names: yup.string().required("Campo obligatorio"),
            email: yup .string().required("Este campo es obligatorio").email("Ingrese un correo valio"),
            password: yup.string() .required("Campo obligatorio").min(8, "La contrasena debe ser de minimo 8 caracteres"),
            idRol: yup.number().required('Este campo es obligatorio')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.put(`${import.meta.env.VITE_URL_SERVER}api/User/updateUser`,values);
            console.log(response);
            setLoad(!load);
            setOpen(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              {user.idRol === 1 &&
              <DialogTitle id="alert-dialog-title">
              {"Actualice usuario"}
              
              </DialogTitle>
              }
              {user.idRol === 2 &&
              <DialogTitle id="alert-dialog-title">
              {"Actualizar contraseña"}
              
              </DialogTitle>
              }
              

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {user.idRol === 1 && <div>
                    <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  id="names"
                  name="names"
                  label="nombre"
                  onChange={handleChange}
                  value={values.names}
                  error={errors.names}
                  helperText={errors.names}
                />
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Apellidos"
                  onChange={handleChange}
                  value={values.lastName}
                  error={errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Correo Electronico"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  helperText={errors.names}
                />
                </div>
                  
                }
                  
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="password"
                    name="password"
                    label="Contrasena"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
                  />
                  {user.idRol === 1 && <div>
                    <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="idRol"
                    name="idRol"
                    label="Rol"
                    onChange={handleChange}
                    value={values.idRol}
                    error={errors.idRol}
                    helperText={errors.idRol}
                  />
                  </div>
                  }
                  
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Actualizar</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default UpdateUser;
