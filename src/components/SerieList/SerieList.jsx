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
<div className="container py-4">
  <div className="card shadow-lg border-0 mx-auto" style={{ width: "90%", maxWidth: "1060px" }}>
      <div className="card-body p-4">
        <h2 className="text-center fw-bold mb-4">Lista de séries</h2>

        {series.length === 0 ? (
          <div className="text-center text-muted py-5">
            Nenhuma série cadastrada.
          </div>
        ) : (
          <div className="d-flex flex-wrap gap-4">
  {series.map((s) => (
    <div key={s.id}>
      <div className="card shadow-sm border-0 serie-card"style={{ width: 320 }}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">{s.titulo}</h5>

                    <ul className="list-unstyled small text-body-secondary mb-4">
                      <li><strong>Número de temporadas: </strong>{s.temporadas || "—"}</li>
                      <li><strong>Data de Lançamento: </strong>
                        {s.lancamento || "—"}
                      </li>
                      <li><strong>Diretor: </strong>{s.diretor || "—"}</li>
                      <li><strong>Produtora: </strong>{s.produtora || "—"}</li>
                      <li><strong>Categoria: </strong>{s.categoria || "—"}</li>
                      <li><strong>Data em que assistiu: </strong>
                        {s.assistidoEm || "—"}
                      </li>
                    </ul>

                    <div className="mt-auto d-flex gap-3">
                      <Link to="/cadastro" state={s} className="btn btn-link p-0" title="Editar">
                        <i className="bi bi-pencil fs-5"></i>
                      </Link>
                      <button onClick={() => excluir(s.id)} className="btn btn-link p-0 text-danger" title="Excluir">
                        <i className="bi bi-trash fs-5"></i>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

}
