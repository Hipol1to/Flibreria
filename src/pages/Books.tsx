import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { useBooksStore } from '@/stores/books'
import type { Book } from '@/types/models'
import { paginate } from '@/utils/utilities'

export default function Books() {
  const user = useAuthStore(s => s.user)!
  const books = useBooksStore(s => s.books)
  const load = useBooksStore(s => s.load)
  const remove = useBooksStore(s => s.remove)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5
  const navigate = useNavigate()

  useEffect(() => { load() }, [load])

  const visible = useMemo(() => {
    const mine = user.role === 'admin' ? books : books.filter(b => b.userId === user.id)
    if (!q) return mine
    const qq = q.toLowerCase()
    return mine.filter(
      b => b.title.toLowerCase().includes(qq) || 
      b.author.toLowerCase().includes(qq) || 
      b.tags.join(',').toLowerCase().includes(qq)
    )
  }, [books, user, q])

  const pageData = paginate<Book>(visible, page, perPage)

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Libros</h1>
        {(user.role === 'admin' || user.role === 'editor') && 
        <button className="btn" onClick={() => navigate('/books/new')}>Agregar libro</button>}
      </div>

      <div className="card">
        <input className="input" placeholder="Buscar por título, autor o etiqueta..." value={q} 
         onChange={e => { setQ(e.target.value); setPage(1) }} />
      </div>

      <div className="card" style={{marginTop:12}}>
        <table>
          <thead>
            <tr><th>Título</th><th>Autor</th><th>Año</th><th>Etiquetas</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {pageData.items.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>{b.tags.join(', ')}</td>
                <td style={{display:'flex', gap:8}}>
                  <button className="btn secondary" onClick={() => navigate(`/books/${b.id}/edit`)}>Editar</button>
                  {(user.role === 'admin' || b.userId === user.id) && (
                    <button className="btn danger" onClick={() => remove(b.id)}>Eliminar</button>
                  )}
                </td>
              </tr>
            ))}
            {!pageData.items.length && <tr><td colSpan={5}>Sin resultados.</td></tr>}
          </tbody>
        </table>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
          <button className="btn secondary" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Anterior</button>
          <span>Página {pageData.page} de {pageData.pages} — {pageData.total} elementos</span>
          <button className="btn secondary" disabled={page>=pageData.pages} onClick={()=>setPage(p=>p+1)}>Siguiente</button>
        </div>
      </div>
    </div>
  )
}
