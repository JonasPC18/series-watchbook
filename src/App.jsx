import { HashRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import './App.css'

function App() {

  return (
    <>
      <HashRouter>
        <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      </HashRouter>
    </>
  )
}

export default App
