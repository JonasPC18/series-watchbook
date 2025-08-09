import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <ul>
      <li><Link to="/">Página Inicial</Link></li>
      <li><Link to="cadastro">Cadastrar Série</Link></li>
      <li><Link to="lista">Lista de Séries</Link></li>
      <li><Link to="sobre">Sobre</Link></li>
      </ul>
    </nav>
  )
}
