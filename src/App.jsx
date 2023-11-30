import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import NavBar from './components/molecules/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchValidateToken } from '@lib/authSlice'
import { useEffect } from 'react'
import User from './pages/User/Index'
import Quote from './pages/Quotes/Index'
import Products from './pages/Products/Index'
import Customers from './pages/Customers/Index'
import Login from './pages/auth/login'

const App = ()=> {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() =>{
    const fetchData = async () =>{
      const response = await dispatch(fetchValidateToken())
      console.log('app',response)
    }
    fetchData()
  },[])

  return (
      <Router>
        {
          user && <NavBar/>
        }
        <Routes>
          <Route path='/usuarios' element={<User/>}></Route>
          <Route path='/cotizaciones' element={<Quote/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/clientes' element={<Customers/>}/>
          <Route path='/login' element ={<Login/>}/>
        </Routes>
      </Router>
  )
}

export default App
