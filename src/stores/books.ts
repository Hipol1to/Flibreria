import {create} from 'zustand';
import data from '@/data/db.json';
import {Book, BookInput} from '@/types/models';
import { useAuthStore } from './auth';

const defaultBooks: Book[] = data.books as Book[];

interface BooksState {
    books: Book[]
    load: () => Promise<void>
    add: (input: BookInput) => Promise<Book | null>
    update: (id: string, input: BookInput) => Promise<boolean>
    remove: (id: string) => Promise<boolean>
}

export const useBooksStore = create<BooksState>((set, get) => ({
    books: [],
    async load() {
        await new Promise (r => setTimeout(r,300));
        set({books: defaultBooks});
    },
    async add(input) {
        const user = useAuthStore.getState().user;
        return null;
    },
    async update(id, input) {
        set({
            books: get().books.map(b => b.id === id ? {...b, ...input, updatedAt: new Date().toISOString()} : b) 
        });
        return true;
    },
    async remove(id) {
        set({
            books: get().books.filter(b => b.id !== id)
        });
        return true;
    }
}))