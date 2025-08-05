import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SerieList() {
  const [series, setSeries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('series') || '[]')
    setSeries(guardadas)
  }, [])

  const excluir = id => {
    const novas = series.filter(s => s.id !== id)
    localStorage.setItem('series', JSON.stringify(novas))
    setSeries(novas)
  }

  const editar = serie => navigate('/cadastro', { state: serie })

  if (series.length === 0)
    return <p>Nenhuma série cadastrada ainda.</p>

  return (
    <>
      <ul>
        {series.map(s => (
          <li key={s.id}>
            Título: {s.titulo} | Temporadas: {s.temporadas} | Lançamento: {s.lancamento} | Diretor: {s.diretor} | Produtora: {s.produtora} | Categoria: {s.categoria} | Assistido em: {s.assistidoEm}
            <button onClick={() => editar(s)}>Editar</button>
            <button onClick={() => excluir(s.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/cadastro')}>Cadastrar nova série</button>
    </>
  )
}
