import { Container } from "@mui/material"
import { useState } from "react"
import CreateProduct from "@components/molecules/Products/CreateProduct/CreateProduct"
import ListProducts from "@components/molecules/Products/ListProducts/ListProducts"
import UpdateProduct from "@components/molecules/Products/UpdateProduct/UpdateProduct"

const Products = () => {
    const [load,setLoad]= useState(false)
    const [idUpdate, setIdUpdate] = useState('')
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