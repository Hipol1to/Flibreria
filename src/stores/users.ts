import {create} from 'zustand';
import data from '@/data/db.json';
import {User, Role} from '@/types/models';
import { get } from 'http';

const defaultUsers: User[] = data.users as User[];

interface usersState {
    users: User[]
    load: () => Promise<void>
    setRole: (id: string, role: Role) => void
}

export const userStore = create<usersState>((set,get) => ({
    users: [],
    async load() {
        await new Promise (r=>setTimeout(r,300));
        set({
            users: defaultUsers.map(u =>({...u, password: ''}))
        })
    },
    setRole(userId, role) {
        set({
            users: get().users.map(u => u.id === userId ? {...u, role} : u)
        })
    }
}))