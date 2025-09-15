import { useLocation } from 'react-router-dom'
import SerieForm from '../components/SerieForm/SerieForm'

export default function Cadastro() {
  const { state: initial } = useLocation()

  return <SerieForm initial={initial} />
}

