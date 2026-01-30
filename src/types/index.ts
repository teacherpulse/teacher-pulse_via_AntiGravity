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
    current_assessment_score?: number
    module_name?: string
    total_average_current_year?: number
    assessment_date?: string
    mobile?: string
    avgScore?: number
}

export interface Student {
    id: string
    name: string
    class: string
    section: string
    gender: string
    fatherName: string
    motherName: string
    mobile: string
    vidyaPulseScore: number
}

export interface Parent {
    id: string
    name: string
    studentName: string
    class: string
    section: string
    gender: string
    mobile: string
    parentPulseScore: number
}
