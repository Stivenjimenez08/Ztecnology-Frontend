import { Container } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateUser from "@components/molecules/User/CreateUser/CreateUser"
import ListUser from "@components/molecules/User/ListUSer/ListUser"
import UpdateUser from "@components/molecules/User/UpdateUser/UpdateUser"
import DeleteUser from '@components/molecules/User/DeleteUser/DeleteUSer'
import './main.css'

const User = () =>{

  const [load,setLoad]= useState(false)
  const [idUpdate, setIdUpdate] = useState('')
  const [idDelete, setIdDelete] = useState('')
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
        <Container className="container" sx={{mt:5}}>
          <h1>Usuarios</h1>
          <ListUser load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
          <CreateUser load={load} setLoad={setLoad}/>
          <UpdateUser idUpdate={idUpdate} load={load} setLoad={setLoad}/>
          <DeleteUser idDelete={idDelete} load={load} setLoad={setLoad}/>
        </Container>

        
          {/* <Router>
          <Routes>
            <h1>Usuarios</h1>
            <Route path='/listar' element={<ListUser />}></Route>
            <Route path='/crear' element={<CreateUser/>}/>
          </Routes>
          </Router> */}
      </>
    )
}

export default User