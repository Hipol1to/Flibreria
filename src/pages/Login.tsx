import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

export default function Login() {
  const [email, setEmail] = useState('domingo@iqnext.com')
  const [password, setPassword] = useState('domingoLapara123')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const ok = await login({ email, password })
    if (!ok) setError('Credenciales inválidas')
    else navigate('/')
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1>Iniciar sesión</h1>
      <form className="card" onSubmit={onSubmit}>
        <label>Email</label>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p style={{ color: '#f87171' }}>{error}</p>}
        <button className="btn" type="submit">Entrar</button>
        <p style={{opacity:.7, marginTop:8}}>Usuarios:</p>
        <p style={{opacity:.7, marginTop:8}}>domingo@iqnext.com / domingoLapara123 (admin)</p>
        <p style={{opacity:.7, marginTop:8}}>hipolito@iqnext.com / hipolitoperez.NOmejiaXD123 (editor)</p>
        <p style={{opacity:.7, marginTop:8}}>fulanito@iqnext.com / fulanitoalvareZZZ321 (reader)</p>
      </form>
    </div>
  )
}