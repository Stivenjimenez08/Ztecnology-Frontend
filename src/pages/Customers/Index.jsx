import { Container } from "@mui/material"
import { useState } from "react"
import CreateCustomer from '@components/molecules/Customer/CreateCustomer/CreateCustomer'
import ListCustomer from "@components/molecules/Customer/ListCustomer/ListCustomer"
import UpdateCustomer from "@components/molecules/Customer/UpdateCustomer/UpdateCustomer"
import DeleteCustomer from "@components/molecules/Customer/DeleteCustomer/DeleteCustomer"

const Customers = () => {
    
const [load,setLoad]= useState(false)
  const [idUpdate, setIdUpdate] = useState('')
  const [idDelete, setIdDelete] = useState('')

    return(
        <Container sx={{mt:5}}>
            <h1>Clientes</h1>
            <ListCustomer load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
            <CreateCustomer load={load} setLoad={setLoad}/>
            <UpdateCustomer idUpdate={idUpdate} load={load} setLoad={setLoad}/>
            <DeleteCustomer idDelete={idDelete} load={load} setLoad={setLoad}/>
        </Container>
    )
}

export default Customers