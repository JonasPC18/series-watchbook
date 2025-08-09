import { HashRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Lista from './pages/Lista'
import Sobre from './pages/Sobre'
import './App.css'

function App() {

  return (
    <>
      <HashRouter>
        <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="lista" element={<Lista />} />
          <Route path="sobre" element={<Sobre />} />
        </Routes>
      </div>
      </HashRouter>
    </>
  )
}

export default App
