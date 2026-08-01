function Error({ statusCode }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1a2332 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {statusCode || 'Erreur'}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          {statusCode === 404 ? 'Page non trouvée' : 'Une erreur est survenue'}
        </p>
        <a href="/" style={{ 
          display: 'inline-block',
          marginTop: '2rem',
          padding: '12px 24px',
          background: '#2563eb',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error