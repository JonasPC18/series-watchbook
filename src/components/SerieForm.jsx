import { useState, useEffect } from 'react'

const blank = {
  titulo: '',
  temporadas: '',
  lancamento: '',
  diretor: '',
  produtora: '',
  categoria: '',
  assistidoEm: ''
}

export default function SerieForm({ initial, onSubmit }) {
  const [form, setForm] = useState(blank)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

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
    onSubmit(form, initial?.id)
    setForm(blank)
  }

  const field = (name, label, type = 'text') => (
    <div style={{ marginBottom: 8 }}>
      <label>
        {label}:<br />
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
        />
      </label>
      {errors[name] && (
        <div style={{ color: 'red', fontSize: 12 }}>
          {errors[name]}
        </div>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {field('titulo', 'Título')}
      {field('temporadas', 'Número de Temporadas', 'number')}
      {field('lancamento', 'Data de Lançamento', 'date')}
      {field('diretor', 'Diretor')}
      {field('produtora', 'Produtora')}
      {field('categoria', 'Categoria')}
      {field('assistidoEm', 'Data em que assistiu', 'date')}
      <button type="submit">Salvar Série</button>
    </form>
  )
}
