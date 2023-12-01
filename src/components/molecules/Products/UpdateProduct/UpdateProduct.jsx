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

const UpdateProduct = ({ idUpdate , load , setLoad }) => {

    const [open, setOpen] =  useState(false);
    const [formData, setFormData] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const consultProductsById = async(id) =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/Product/productById/${id}`)
      console.log('data',response.data.products)
      setFormData(response.data.products)
    }
    useEffect(()=>{
        if(idUpdate){
          consultProductsById(idUpdate);
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
            name: formData.name || '',
            description: formData.description || '',
            price: formData.price || '',
            stock: formData.stock || ''
          }}

          validationSchema={yup.object({
            name: yup.string().required('Este campo es obligatorio'),
            description: yup.string(),
            stock: yup.string().required('Este campo es obligatorio'),//no me deja ingresar datos de ningun tipo, saca error en consola
            price: yup.number().required('Este campo es obligatorio')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.put(`${import.meta.env.VITE_URL_SERVER}api/Product/updateProduct`,values);
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
                    id="name"
                    name="name"
                    label="Nombre producto"
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="stock"
                    name="stock"
                    label="Stock"
                    onChange={handleChange}
                    value={values.stock}
                    error={errors.stock}
                    helperText={errors.stock}
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="price"
                    name="price"
                    label="Precio"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price}
                    helperText={errors.price}
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="description"
                    name="description"
                    label="Descripcion"
                    onChange={handleChange}
                    value={values.description}
                    error={errors.description}
                    helperText={errors.description}
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

export default UpdateProduct 
