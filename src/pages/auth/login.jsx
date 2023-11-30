import * as React from "react";
import { TextField, Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "@lib/authSlice";
import { Container } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup'


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    
    if(loading){
        return <>Cargando...</>
    }
    if(user){
        return navigate("/usuarios")
    }

  return (
    <>
      <Container>
        <Formik
          initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Este campo es obligatorio").email("Direccion de correo no valida"),
                password: Yup.string().required("Este campo es obligatorio").min(8, "Complete 8 caracteres en el campo contraseña"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const response = await dispatch(fetchLogin(values))
                if(response.payload.user){
                    return navigate("/usuarios")
                }
            }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="Content">
              <div className="Columns">
                <h1>Iniciar Sesion</h1>
                <TextField
                  className="input"
                  id="email"
                  name="email"
                  label="Correo electronico"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  helperText={errors.email}
                />
                <TextField
                  className="input"
                  type="password"
                  id="password"
                  name="password"
                  label="Contraseña"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                  helperText={errors.password}
                />
                <div className="rows">
                  <div className="btn">
                    <Button type="submit" disabled={isSubmitting} id="btn1">
                      Iniciar sesion
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
