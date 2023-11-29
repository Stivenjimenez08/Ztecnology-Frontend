import * as React from "react";
import { Formik } from "formik";
import { TextField, Button} from "@mui/material";
import axios from "axios";
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import '../Quote.css'

const CreateQuote = ({load,setLoad}) => {

  return (
    <>
      <Formik
        initialValues={{date:"", idCustomer:"", serial:"", idProduct:"", quantity:"", discount:"", idUser:"", subTotal:"", total:""}}
        validationSchema={Yup.object ({
          date: Yup.string().required('Este campo es obligatorio'),
          idCustomer: Yup.number().required('Este campo es obligatorio'),
          serial: Yup.number().required('Este campo es obligatorio'),
          idProduct: Yup.number().required('Este campo es obligatorio'),
          quantity: Yup.number().required('Este campo es obligatorio'),
          discount: Yup.number(),
          idUser: Yup.number().required('Este campo es obligatorio'),
          subTotal: Yup.number(),
          total: Yup.number().required('Este campo es obligatorio'),
        })}

        onSubmit={async(values, { setSubmitting }) => {
         const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/Quote/createQuote`,values)
         console.log(response)
         setLoad(!load)
         Swal.fire({
          tittle: "Info",
          text: response.data.msg,
          icon: "success"
      })
        }}
        >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="Content">
            <div className="Columns">
              <h1>Crear Cotizacion</h1>
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
                <TextField
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
 
              <div className="rows">
                <div className="btn">
                  <Button type="submit" disabled={isSubmitting} id="btn1">Crear Cotizacion</Button>
                  <Button type="submit" disabled={isSubmitting} id="btn2">cancelar</Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateQuote;
