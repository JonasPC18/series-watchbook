import { useState, useEffect } from 'react'

// objeto "molde" com todas as chaves e valores vazios
const blank = {
  id: null,
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

  // quando a prop "initial" mudar, sobrescreve o estado form
  useEffect(() => {
    if (initial) {
      setForm({ ...blank, ...initial })
      setErrors({})
    } else {
      setForm({ ...blank })
      setErrors({})
    }
  }, [initial])

  // atualiza um campo do formulário conforme o usuário digita
  const handleChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value })

  // valida se todos os campos foram preenchidos; devolve true caso esteja tudo ok
  const validate = () => {
    const err = {}
    Object.keys(blank).forEach(key => {
      if (key === 'id') return
      if (!form[key]) err[key] = 'Obrigatório'
    })
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!validate()) return

    const guardadas = JSON.parse(localStorage.getItem('series') || '[]')
    let atualizadas = guardadas
    let salva = form
    const isEditing = Boolean(form.id)

    if (isEditing) {
      const encontrou = guardadas.some(serie => serie.id === form.id)
      if (encontrou) {
        atualizadas = guardadas.map(serie =>
          serie.id === form.id ? { ...serie, ...form } : serie
        )
      } else {
        atualizadas = [...guardadas, form]
      }

      salva = { ...form }
      alert('Série atualizada!')
    } else {
      salva = { ...form, id: Date.now() }
      atualizadas = [...guardadas, salva]
      alert('Série salva!')
    }

    localStorage.setItem('series', JSON.stringify(atualizadas))

    if (onSubmit) onSubmit(salva)

    setForm({ ...blank })
  }

  // helper para renderizar um campo de entrada (label + input + mensagem de erro)
  const field = (name, label, type = 'text', extra = {}) => (
    <div className="mb-3">
      <label className="form-label text-dark">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`form-control form-control-lg ${
          errors[name] ? 'is-invalid' : ''
        }`}
        {...extra}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  )

  return (
    <div className="container py-5">
      <div
        className="mx-auto border rounded shadow-lg p-4 p-md-5 text-dark"
        style={{
          width: 'min(90vw, 760px)',
          background: '#fff',
          backdropFilter: 'blur(2px)'
        }}
      >
        <h2 className="mb-4 text-center text-dark">Cadastro de Série</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-12">{field('titulo', 'Título')}</div>

            <div className="col-12 col-md-6">
              {field('temporadas', 'Número de Temporadas', 'number', {
                min: 0,
                inputMode: 'numeric'
              })}
            </div>

            <div className="col-12 col-md-6">
              {field('lancamento', 'Data de Lançamento', 'date')}
            </div>

            <div className="col-12 col-md-6">{field('diretor', 'Diretor')}</div>

            <div className="col-12 col-md-6">
              {field('produtora', 'Produtora')}
            </div>

            <div className="col-12 col-md-6">
              {field('categoria', 'Categoria')}
            </div>

            <div className="col-12 col-md-6">
              {field('assistidoEm', 'Data em que assistiu', 'date')}
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-dark btn-lg px-4">
              {Boolean(form.id) ? 'Atualizar Série' : 'Salvar Série'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

