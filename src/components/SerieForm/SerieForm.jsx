import { useState, useEffect } from 'react'

// objeto “molde” com todas as chaves e valores vazios
const blank = {
  titulo: '',
  temporadas: '',
  lancamento: '',
  diretor: '',
  produtora: '',
  categoria: '',
  assistidoEm: ''
}

// prop "initial": objeto opcional para preencher o formulário (modo edição) 
// prop onSubmit: callback opcional caso o pai queira tratar o envio
export default function SerieForm({ initial, onSubmit }) {
// estado que armazena os valores do formulário
  const [form, setForm] = useState(blank)
// estado que guarda mensagens de erro de validação
  const [errors, setErrors] = useState({})

// quando a prop "initial" mudar, sobrescreve o estado `form`
  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

// atualiza um campo do formulário conforme o usuário digita
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

// valida se todos os campos foram preenchidos; devolve true caso esteja tudo ok
  const validate = () => {
    const err = {}
    Object.keys(blank).forEach(k => {
      if (!form[k]) err[k] = 'Obrigatório'
    })
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return

// lê as séries já salvas no localStorage (ou inicia um array vazio)
    const guardadas = JSON.parse(localStorage.getItem('series') || '[]')
// adiciona a nova série com um id único baseado no timestamp    
    guardadas.push({ ...form, id: Date.now() })
// persiste o array atualizado de volta no localStorage
    localStorage.setItem('series', JSON.stringify(guardadas))
// limpa o formulário
    setForm(blank)
// feedback para o usuário
    alert('Série salva!')
  }

//helper para renderizar um campo de entrada (label + input + mensagem de erro)
const field = (name, label, type = "text", extra = {}) => (
    <div className="mb-3">
      <label className="form-label text-dark">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`form-control form-control-lg ${
          errors[name] ? "is-invalid" : ""
        }`}
        {...extra}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container py-5">
      <div
        className="mx-auto border rounded shadow-lg p-4 p-md-5 text-dark"
        style={{
          width: "min(90vw, 760px)",
          background: "#fff",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="mb-4 text-center text-dark">Cadastro de Série</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-12">{field("titulo", "Título")}</div>

            <div className="col-12 col-md-6">
              {field("temporadas", "Número de Temporadas", "number", {
                min: 0,
                inputMode: "numeric",
              })}
            </div>

            <div className="col-12 col-md-6">
              {field("lancamento", "Data de Lançamento", "date")}
            </div>

            <div className="col-12 col-md-6">
              {field("diretor", "Diretor")}
            </div>

            <div className="col-12 col-md-6">
              {field("produtora", "Produtora")}
            </div>

            <div className="col-12 col-md-6">
              {field("categoria", "Categoria")}
            </div>

            <div className="col-12 col-md-6">
              {field("assistidoEm", "Data em que assistiu", "date")}
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-dark btn-lg px-4">
              Salvar Série
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}