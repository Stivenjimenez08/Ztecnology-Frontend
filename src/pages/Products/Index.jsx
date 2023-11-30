import { Container } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProduct from "@components/molecules/Products/CreateProduct/CreateProduct"
import ListProducts from "@components/molecules/Products/ListProducts/ListProducts"
import UpdateProduct from "@components/molecules/Products/UpdateProduct/UpdateProduct"

const Products = () => {
    const [load,setLoad]= useState(false)
    const [idUpdate, setIdUpdate] = useState('')
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    
    if(loading){
        return <>Cargando...</>
    }
    if(!user){
        return navigate("/login")
    }
    return(
        <>
        <Container sx={{mt:5}}>
            <h1>Productos</h1>
            <ListProducts load={load} setIdUpdate={setIdUpdate}/>
            <CreateProduct load={load} setLoad={setLoad}/>
            <UpdateProduct idUpdate={idUpdate} load={load} setLoad={setLoad}/>
        </Container>
        </>
    )
}

export default Products