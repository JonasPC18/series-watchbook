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

// jsx que monta o formulário na interface
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
