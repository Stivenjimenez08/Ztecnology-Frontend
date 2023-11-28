import * as React from "react";
import { Formik } from "formik";
import { TextField, Button} from "@mui/material";
import axios from "axios";
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const CreateCustomer = ({ load, setLoad }) => {

  return (
    <>
      <Formik
        initialValues={{names: "", nit: "", email: "", address: ""}}
        validationSchema={Yup.object ({
          names: Yup.string().required('Este campo es obligatorio').min(8,'Este campo acepta minimo 8 digitos'),
          nit: Yup.number().required('Este campo es obligatorio'),
          email: Yup.string().required('Este campo es obligatorio').email('Direccion de correo no valida'),
          address: Yup.string().required('Este campo es obligatorio')
        })}

        onSubmit={async(values, { setSubmitting }) => {
         const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/Customer/createCustomer`,values)
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
              <h1>Crear Cliente</h1>
              
                <TextField
                  className="input"
                  id="names"
                  name="names"
                  label="Nombre"
                  onChange={handleChange}
                  value={values.names}
                  error={errors.names}
                  helperText={errors.names}
                />
                <TextField
                  className="input"
                  id="nit"
                  name="nit"
                  label="Nit"
                  onChange={handleChange}
                  value={values.nit}
                  error={errors.nit}
                  helperText={errors.nit}
                />
                <TextField 
                  className="input"
                  id="email"
                  name="email"
                  label="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  helperText={errors.email}
                />
                <TextField
                  className="input"
                  id="address"
                  name="address"
                  label="Direccion"
                  onChange={handleChange}
                  value={values.address}
                  error={errors.address}
                  helperText={errors.address}
                />
                
              <div className="rows">
                <div className="btn">
                  <Button type="submit" disabled={isSubmitting} id="btn1">Crear Cliente</Button>
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

export default CreateCustomer;
