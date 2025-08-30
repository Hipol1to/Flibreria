export type Role = 'admin' | 'editor' | 'reader'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export interface Book {
  id: string
  title: string
  author: string
  year: number
  tags: string[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface LoginInput { email: string; password: string }
export type BookInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;