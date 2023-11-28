import NavBar from './components/molecules/NavBar/NavBar'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import User from './pages/User'
import Quote from './pages/Quotes/Index'
import Products from './pages/Products/Index'
import Customers from './pages/Customers/Index'

const App = ()=> {

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/usuarios' element={<User/>}></Route>
          <Route path='/cotizaciones' element={<Quote/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/clientes' element={<Customers/>}/>
        </Routes>
      </Router>
    </>

  )
}

export default App
