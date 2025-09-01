import { useEffect, useMemo } from 'react'
import { useAuthStore } from '@/stores/auth'
import { useBooksStore } from '@/stores/books'
import { useUsersStore } from '@/stores/users'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const user = useAuthStore(s => s.user)!
  const loadBooks = useBooksStore(s => s.load)
  const books = useBooksStore(s => s.books)
  const loadUsers = useUsersStore(s => s.load)
  const users = useUsersStore(s => s.users)

  useEffect(() => { 
    loadBooks(); if (user.role === 'admin') loadUsers() 
    }, 
    [loadBooks, loadUsers, user.role])

  const myBooks = useMemo(() => 
    user.role === 'admin' ? books : books.filter(b => b.userId === user.id), [books, user]
  )
  const lastBook = myBooks[0]
  const byYear = useMemo(() => {
    const map = new Map<number, number>()
    myBooks.forEach(b => { 
        map.set(b.year, (map.get(b.year) || 0) + 1) 
    })
    return [...map.entries()].sort((a,b)=>a[0]-b[0]).map(([year,count]) => ({ year, count }))
  }, [myBooks])

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="card" style={{flex:1}}>
          <h3>👤 Usuario</h3>
          <p><strong>{user.name}</strong> — <span className="pill">{user.role}</span></p>
        </div>
        <div className="card" style={{flex:1}}>
          <h3>📚 Libros ({user.role === 'admin' ? 'todos' : 'míos'})</h3>
          <p style={{fontSize:28, margin:0}}>{myBooks.length}</p>
        </div>
        <div className="card" style={{flex:2}}>
          <h3>🆕 Último libro agregado</h3>
          {lastBook ? <p><strong>{lastBook.title}</strong> — {lastBook.author} ({lastBook.year})</p> : <p>Sin datos</p>}
        </div>
        {user.role === 'admin' && (
          <div className="card" style={{flex:1}}>
            <h3>👥 Usuarios</h3>
            <p style={{fontSize:28, margin:0}}>{users.length || 3}</p>
          </div>
        )}
      </div>

      <div className="card" style={{marginTop:16, height:320}}>
        <h3>📈 Libros por año</h3>
        {byYear.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byYear}>
              <XAxis dataKey="year" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>No hay datos suficientes.</p>}
      </div>
    </div>
  )
}
