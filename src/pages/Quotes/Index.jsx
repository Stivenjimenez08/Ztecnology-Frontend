import { Container } from "@mui/material"
import { useState } from "react"
import ListQuotes from "@components/molecules/Quotes/ListQuote/ListQuote"
import CreateQuote from "@components/molecules/Quotes/CreateQuote/CreateQuote"
import UpdateQuote from "../../components/molecules/Quotes/UpdateQuote/UpdateQuote"

const Quote = () => {
    const [load,setLoad]= useState(false)
    const [idUpdate, setIdUpdate] = useState('')
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