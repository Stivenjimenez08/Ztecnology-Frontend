import * as React from "react";
import { Formik } from "formik";
import { TextField, Button} from "@mui/material";
import './StyleCreateUSer.css'
import axios from "axios";
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const CreateUser = ({load,setLoad}) => {

  return (
    <>
      <Formik
        initialValues={{names: "", lastName: "", email: "", password: "", idRol: ""}}
        validationSchema={Yup.object ({
          names: Yup.string().required('Este campo es obligatorio'),
          email: Yup.string().required('Este campo es obligatorio').email('Direccion de correo no valida'),
          password: Yup.string().required('Este campo es obligatorio').min(8,'Complete 8 caracteres en el campo contraseña'),
          idRol: Yup.number().required()
        })}

        onSubmit={async(values, { setSubmitting }) => {
         const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/User/createUser`,values)
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
              <h1>Crear Usuario</h1>
              
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
                  id="lastName"
                  name="lastName"
                  label="Apellidos"
                  onChange={handleChange}
                  value={values.lastName}
                  error={errors.lastName}
                  helperText={errors.lastName}
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
                  id="password"
                  name="password"
                  label="password"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                  helperText={errors.password}
                />

                <TextField
                  className="input"
                  id="idRol"
                  name="idRol"
                  label="Rol"
                  onChange={handleChange}
                  value={values.idRol}
                  error={errors.idRol}
                  helperText={errors.idRol}
                />
                
              <div className="rows">
                <div className="btn">
                  <Button type="submit" disabled={isSubmitting} id="btn1">Crear Usuario</Button>
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

export default CreateUser;
