import {create} from 'zustand'
import data from '@/data/db.json';
import type {LoginInput, User, Role} from '@/types/models';

const defaultUsers: User[] = data.users as User[]; 

interface AuthState {
    user: User | null;
    login: (input: LoginInput) => Promise<boolean>;
    logout: () => void
    is: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    async login({email, password}) {
        await new Promise(r => setTimeout(r, 300));
        const found = defaultUsers.find(u => u.email === email && u.password === password);
        if(found) {
            set({
                user: {...found, password: ''}
            })
            return true;
        }
        return false;
    },
    logout() {
        set({user: null});
    },
    is(role) { return get().user?.role === role }
}))