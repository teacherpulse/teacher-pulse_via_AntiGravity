export type Role = 'admin' | 'teacher'

export interface Profile {
    id: string
    full_name: string
    email: string
    role: Role
    department: string
    joining_date: string
    avatar_url?: string
}
