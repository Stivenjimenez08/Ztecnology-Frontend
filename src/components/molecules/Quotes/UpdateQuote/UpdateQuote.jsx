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

const UpdateQuote = ({ idUpdate , load , setLoad }) => {

    const [open, setOpen] =  useState(false);
    const [formData, setFormData] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const consultQuoteById = async(id) =>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/Quote/QuoteById`,id)
      console.log('data',response.data.Quotes)
      setFormData(response.data.Quotes)
    }
    useEffect(()=>{
        if(idUpdate){
            consultQuoteById(idUpdate);
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
            date: formData.date || '',
            idCustomer: formData.idCustomer || '',
            serial: formData.serial || '',
            idProduct: formData.idProduct || '',
            quantity: formData.quantity ||'',
            discount: formData.discount ||'',
            idUser: formData.idUser ||'',
            subTotal: formData.subTotal ||'',
            total: formData.total ||''
          }}

          validationSchema={yup.object({
            date: yup.string().required('Este campo es obligatorio'),
            idCustomer: yup.string().required('Este campo es obligatorio'),
            serial: yup.string().required('Este campo es obligatorio'),
            idProduct: yup.string().required('Este campo es obligatorio'),
            quantity: yup.string().required('Este campo es obligatorio'),
            discount: yup.string(),
            idUser: yup.string().required('Este campo es obligatorio'),
            subTotal: yup.string(),
            total: yup.string().required('Este campo es obligatorio'),
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
              <DialogTitle id="alert-dialog-title">
                {"Actualice usuario"}
              </DialogTitle>

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div className="row">
                  <TextField
                    className="input"
                    id="date"
                    name="date"
                    label="Fecha"
                    onChange={handleChange}
                    value={values.date}
                    error={errors.date}
                    helperText={errors.date}
                  />
                  <TextField // preguntar como poner el nombre  y en base de datos ponga el id
                    className="input"
                    id="idCustomer"
                    name="idCustomer"
                    label="Cliente"
                    onChange={handleChange}
                    value={values.idCustomer}
                    error={errors.idCustomer}
                    helperText={errors.idCustomer}
                  />
                </div>
                <div className="row">
                  <TextField 
                    className="input"
                    id="serial"
                    name="serial"
                    label="Serial"
                    onChange={handleChange}
                    value={values.serial}
                    error={errors.serial}
                    helperText={errors.serial}
                  />
                  <TextField
                    className="input"
                    id="idProduct"
                    name="idProduct"
                    label="Producto"
                    onChange={handleChange}
                    value={values.idProduct}
                    error={errors.idProduct}
                    helperText={errors.idProduct}
                  />
                </div>
                <div className="row">
                  <TextField
                    className="input"
                    id="quantity"
                    name="quantity"
                    label="Cantidad"
                    onChange={handleChange}
                    value={values.quantity}
                    error={errors.quantity}
                    helperText={errors.quantity}
                  />
                  <TextField
                    className="input"
                    id="discount"
                    name="discount"
                    label="Descuento"
                    onChange={handleChange}
                    value={values.discount}
                    error={errors.discount}
                    helperText={errors.discount}
                  />
                </div>
                <div className="row">
                  <TextField
                    className="input"
                    id="subTotal"
                    name="subTotal"
                    label="Sub Total"
                    onChange={handleChange}
                    value={values.subTotal}
                    error={errors.subTotal}
                    helperText={errors.subTotal}
                  />
                  <TextField
                    className="input"
                    id="Total"
                    name="Total"
                    label="Total"
                    onChange={handleChange}
                    value={values.total}
                    error={errors.total}
                    helperText={errors.total}
                  />
                </div>
                <div className="row">
                  <TextField
                    className="input"
                    id="idUser"
                    name="idUser"
                    label="Usuario que atendio"
                    onChange={handleChange}
                    value={values.idUser}
                    error={errors.idUser}
                    helperText={errors.idUser}
                  />
                </div>
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

export default UpdateQuote;
