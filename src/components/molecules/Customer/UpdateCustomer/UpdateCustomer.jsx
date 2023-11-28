import React, {useEffect, useState} from 'react'
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Formik} from "formik";
import axios from "axios";
import * as yup from 'yup';

const UpdateCustomer = ({ idUpdate , load , setLoad }) => {

    const [open, setOpen] =  useState(false);
    const [formData, setFormData] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const consultCustomerById = async(id) =>{
      console.log(id)
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/Customer/customerById`,id)
      console.log('data',response.data.customers)
      setFormData(response.data.customers)
    }
    useEffect(()=>{
        if(idUpdate){
          consultCustomerById(idUpdate);
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
            nit: formData.nit || '',
            email: formData.email || '',
            address: formData.address || ''
          }}

          validationSchema={yup.object({
            names: yup.string().required("Campo obligatorio"),
            email: yup.string().required("Este campo es obligatorio").email("Ingrese un correo valido"),
            nit: yup.number().required("Campo obligatorio").min(8, "La contrasena debe ser de minimo 8 caracteres"),
            address: yup.string().required('Este campo es obligatorio')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.put(`${import.meta.env.VITE_URL_SERVER}api/Customer/updateCustomer`,values);
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
              <DialogTitle id="alert-dialog-title">
                {"Actualice usuario"}
              </DialogTitle>

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
                    id="nit"
                    name="nit"
                    label="Nit"
                    onChange={handleChange}
                    value={values.nit}
                    error={errors.nit}
                    helperText={errors.nit}
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
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="address"
                    name="address"
                    label="Direccion"
                    onChange={handleChange}
                    value={values.address}
                    error={errors.address}
                    helperText={errors.address}
                  />
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

export default UpdateCustomer;
