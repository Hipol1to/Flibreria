import { useEffect } from 'react'
import { useUsersStore } from '@/stores/users'
import { useBooksStore } from '@/stores/books'
import type { Role } from '@/types/models'

export default function Users() {
  const load = useUsersStore(s => s.load)
  const users = useUsersStore(s => s.users)
  const setRole = useUsersStore(s => s.setRole)
  const books = useBooksStore(s => s.books)
  const loadBooks = useBooksStore(s => s.load)

  useEffect(() => { load(); loadBooks() }, [load, loadBooks])

  const countBooks = (userId: string) => books.filter(b => b.userId === userId).length

  return (
    <div className="container">
      <h1>Usuarios</h1>
      <div className="card">
        <table>
          <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Libros</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select className="select" value={u.role} onChange={e => setRole(u.id, e.target.value as Role)}>
                    <option value="admin">admin</option>
                    <option value="editor">editor</option>
                    <option value="reader">reader</option>
                  </select>
                </td>
                <td>{countBooks(u.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
