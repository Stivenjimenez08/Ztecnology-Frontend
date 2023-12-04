import { Container } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListQuotes from "@components/molecules/Quotes/ListQuote/ListQuote"
import CreateQuote from "@components/molecules/Quotes/CreateQuote/CreateQuote"
import UpdateQuote from "@components/molecules/Quotes/UpdateQuote/UpdateQuote"

const Quote = () => {
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
        <Container>
            <h1>Quotes</h1>
            <ListQuotes load={load} setIdUpdate={setIdUpdate}/>
            <CreateQuote load={load} setLoad={setLoad}/>
            <UpdateQuote idUpdate={idUpdate} load={load} setLoad={setLoad}/>
        </Container>
    )
}

export default Quote