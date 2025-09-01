import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBooksStore } from '@/stores/books'
import type { Book } from '@/types/models'

export default function BookForm() {
  const params = useParams()
  const id = params.id
  const books = useBooksStore(s => s.books)
  const load = useBooksStore(s => s.load)
  const add = useBooksStore(s => s.add)
  const update = useBooksStore(s => s.update)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState<number>(2024)
  const [tags, setTags] = useState('')

  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (!id) return
    const found = books.find(b => b.id === id)
    if (found) {
      setTitle(found.title); setAuthor(found.author); setYear(found.year); setTags(found.tags.join(', '))
    }
  }, [id, books])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = { 
        title, author, year: Number(year), 
        tags: tags.split(',').map(s=>s.trim()).filter(Boolean) 
    }
    if (id) {
      await update(id, input)
    } else {
      const created = await add(input)
      if (!created) { 
        alert('Ha ocurrido un error al agregar el libro (dado que la persistencia de datos es estatica se ha optado por no modificar el JSON que almacenan los libros)'); 
        return 
      }
    }
    navigate('/books')
  }

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h1>{id ? 'Editar libro' : 'Agregar libro'}</h1>
      <form className="card" onSubmit={onSubmit}>
        <label>Título</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />

        <label>Autor</label>
        <input className="input" value={author} onChange={e=>setAuthor(e.target.value)} required />

        <label>Año</label>
        <input className="input" type="number" value={year} 
        onChange={
            e=>setYear(Number(e.target.value))
        } required />

        <label>Etiquetas (separadas por coma)</label>
        <input className="input" value={tags} onChange={e=>setTags(e.target.value)} />

        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" type="submit">Guardar</button>
          <button className="btn secondary" type="button" onClick={()=>navigate('/books')}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
