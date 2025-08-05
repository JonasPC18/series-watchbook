import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 

export default function SerieList() {
// lista de séries mantida no estado
  const [series, setSeries] = useState([])

// carrega do localStorage na montagem do componente
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('series') || '[]')
    setSeries(guardadas)
  }, [])

// exclui uma série e persiste a lista nova
  const excluir = id => {
    const novas = series.filter(s => s.id !== id)
    localStorage.setItem('series', JSON.stringify(novas))
    setSeries(novas)
  }

// se não há séries
  if (series.length === 0)
    return <p>Nenhuma série cadastrada ainda.</p>

  return (
    <>
      <ul>
        {series.map(s => (
          <li key={s.id}>
            Título: {s.titulo} | Temporadas: {s.temporadas} | Lançamento: {s.lancamento} | Diretor: {s.diretor} | Produtora: {s.produtora} | Categoria: {s.categoria} | Assistido em: {s.assistidoEm}
            <Link to="/cadastro" state={s}>
              <button>Editar</button>
            </Link>
            <button onClick={() => excluir(s.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <Link to="/cadastro">
        <button>Cadastrar nova série</button>
      </Link>
    </>
  )
}
