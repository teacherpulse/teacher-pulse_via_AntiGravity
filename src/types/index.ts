export type Role = 'admin' | 'teacher'

export interface Profile {
    id: string
    full_name: string
    email: string
    avatar_url?: string
    role: string
    designation?: string // Specific job title (e.g. Subject Teacher, Principal)
    department?: string
    joining_date?: string
    status?: "active" | "inactive"
}

export interface Student {
    id: string
    full_name: string
    admission_number: string
    grade_level: string
    section: string
    age_group: string // 'age_3_6' | 'age_6_10' | 'age_11_16'
    parent_name: string
    created_at?: string
}
