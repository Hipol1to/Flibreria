import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import '@/styles/app.css'

export default function Layout({children}: {children: React.ReactNode}) {
    const user = useAuthStore(s => s.user)
    const logout = useAuthStore(s => s.logout)
    const Navigate = useNavigate();

    return(
        <div className='container'>
            <nav>
                <div className='links'>
                    <Link to='/'><strong>Flibreria</strong></Link>
                    {
                        user && (
                            <>
                            <NavLink to='/'>Dashboard</NavLink>
                            <NavLink to='/books'>Libros</NavLink>
                            {user.role === 'admin' && <NavLink to='/users'>Usuarios</NavLink>}
                            </>
                        )
                    }
                </div>
                <div className='links'>
                    {
                        user ? (
                            <>
                                <span className='pill'> {user.name} - {user.role}</span>
                                <button className='btn secondary' onClick={ ()=>{
                                    logout();
                                    Navigate('/login');
                                }}>Salir</button>
                            </>
                        ) : <NavLink to="/login">Iniciar Sesión</NavLink>
                    }
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}