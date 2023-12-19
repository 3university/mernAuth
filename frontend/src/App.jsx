import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'

function App() {

  return (
   <div>
    <header>
      <Header/>
    </header>

    <main>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/user' element={<Welcome/>}></Route>
      </Routes>
      </main>
   </div>
  )
}

export default App
