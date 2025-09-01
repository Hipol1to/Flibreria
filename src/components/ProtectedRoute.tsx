import {Navigate, Outlet} from 'react-router-dom'
import {useAuthStore} from '@/stores/auth'
import type {Role} from '@/types/models'

export default function ProtectedRoute({allow}: {allow?: Role[]}) {
    const user = useAuthStore(s => s.user)
    if(!user) return <Navigate to="/login" replace />
    if(allow && !allow.includes(user.role)) return <Navigate to="/" replace />
    return <Outlet />
}