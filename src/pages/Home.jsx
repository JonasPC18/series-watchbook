export default function Home() {
  return (
    <div className="text-center">
      <h2
        className="fw-bold mb-2"
        style={{ fontSize: '4rem' }}
      >
        Página Inicial
      </h2>
      <h3
        className="fw-semibold mb-3"
        style={{ fontSize: '2rem' }}
      >
        Bem-vindo ao projeto CRUD de séries!
      </h3>
      <p
        className="text-light mx-auto"
        style={{ fontSize: '1.5rem', maxWidth: '700px' }}
      >
        Gerencie séries assistidas de uma forma fácil e intuitiva.
      </p>
    </div>
  )
}