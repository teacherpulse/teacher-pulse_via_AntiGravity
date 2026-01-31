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
    gender?: string
}

export interface Student {
    id: string
    full_name: string // changed from name to match DB
    admission_number: string
    grade_level: string // changed from class to match DB
    section: string
    age_group?: string
    gender?: string
    fatherName?: string // Keeping for backward compat if needed, but primary is parent_name
    motherName?: string
    mobile?: string
    vidyaPulseScore?: number
    // New fields
    parent_name?: string
    parent_contact_number?: string
    locality?: string
    parent_work?: string
    parent_gender?: string
    status?: "active" | "inactive"
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
    status?: "active" | "inactive"
}
