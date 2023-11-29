import * as React from "react";
import { Formik } from "formik";
import { TextField, Button} from "@mui/material";
import axios from "axios";
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const CreateProduct = ({load,setLoad}) => {

  return (
    <>
      <Formik
        initialValues={{name: "", description: "", stock: "", price: ""}}
        validationSchema={Yup.object ({
          name: Yup.string().required('Este campo es obligatorio'),
          description: Yup.string(),
          stock: Yup.number().required('Este campo es obligatorio'),//no me deja ingresar datos de ningun tipo, saca error en consola
          price: Yup.number().required('Este campo es obligatorio')
        })}

        onSubmit={async(values, { setSubmitting }) => {
         const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/Product/createProduct`,values)
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
              <h1>Crear Producto</h1>
                <TextField
                  className="input"
                  id="name"
                  name="name"
                  label="Nombre del producto"
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name}
                  helperText={errors.name}
                />
                <TextField 
                  className="input"
                  id="price"
                  name="price"
                  label="Precio"
                  onChange={handleChange}
                  value={values.price}
                  error={errors.price}
                  helperText={errors.price}
                />
                <TextField 
                  className="input"
                  id="stock"
                  name="stock"
                  label="Stock"
                  onChange={handleChange}
                  value={values.stock}
                  error={errors.stock}
                  helperText={errors.stock}
                />
                <TextField
                  className="input"
                  id="description"
                  name="description"
                  label="Descripcion"
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                  helperText={errors.description}
                />
              <div className="rows">
                <div className="btn">
                  <Button type="submit" disabled={isSubmitting} id="btn1">Crear Producto</Button>
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

export default CreateProduct;
