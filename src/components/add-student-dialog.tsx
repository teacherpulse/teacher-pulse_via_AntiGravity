
"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Plus, Search } from "lucide-react"
import { Profile } from "@/types"

interface AddStudentDialogProps {
    onStudentAdded?: () => void
    trigger?: React.ReactNode
}

export function AddStudentDialog({ onStudentAdded, trigger }: AddStudentDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchingParent, setSearchingParent] = useState(false)
    const [parents, setParents] = useState<Profile[]>([])
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null)

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        admission_number: '',
        grade_level: '',
        section: '',
        gender: '',
        age_group: '6-10',
        parent_name: '',
        parent_gender: '',
        parent_contact_number: '',
        locality: 'Urban',
        parent_work: ''
    })

    const supabase = createClient()

    // Fetch parents for mapping
    useEffect(() => {
        if (open) {
            fetchParents()
        }
    }, [open])

    const fetchParents = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'parent')
            .limit(50) // Limit for now, could be search-based later

        if (!error && data) {
            setParents(data)
        }
    }

    const handleParentSelect = (parentId: string) => {
        setSelectedParentId(parentId)
        const parent = parents.find(p => p.id === parentId)
        if (parent) {
            setFormData(prev => ({
                ...prev,
                parent_name: parent.full_name || '',
                parent_contact_number: parent.mobile || '',
                parent_gender: parent.gender || '', // Auto-fill gender if available in profile
            }))
            toast.info(`Mapped to parent: ${parent.full_name}`)
        }
    }

    const handleSubmit = async () => {
        if (!formData.full_name || !formData.admission_number) {
            toast.error("Name and Admission Number are required")
            return
        }

        setLoading(true)
        try {
            // 1. Insert Student
            const { error } = await supabase.from('students').insert([formData])
            if (error) throw error

            // 2. Sync Parent Data if mapped
            if (selectedParentId) {
                const { error: profileError } = await supabase.from('profiles').update({
                    gender: formData.parent_gender,
                    work: formData.parent_work,
                    locality: formData.locality
                }).eq('id', selectedParentId)

                if (profileError) {
                    console.error("Failed to sync profile:", profileError)
                    toast.error("Student added, but parent profile sync failed")
                } else {
                    toast.success("Student added & Parent mapped")
                }
            } else {
                toast.success("Student added successfully")
            }

            setOpen(false)
            // Reset form
            setFormData({
                full_name: '',
                admission_number: '',
                grade_level: '',
                section: '',
                gender: '',
                age_group: '6-10',
                parent_name: '',
                parent_gender: '',
                parent_contact_number: '',
                locality: 'Urban',
                parent_work: ''
            })
            onStudentAdded?.()
        } catch (error: any) {
            toast.error("Failed to add student", {
                description: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button><Plus className="mr-2 h-4 w-4" /> Add Student</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Student Details Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground border-b pb-2">Student Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Student Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="e.g. Rahul Verma"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="adm">Admission No *</Label>
                                <Input
                                    id="adm"
                                    value={formData.admission_number}
                                    onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
                                    placeholder="e.g. ADM-2024-001"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="grade">Grade</Label>
                                <Select
                                    value={formData.grade_level}
                                    onValueChange={(v) => setFormData({ ...formData, grade_level: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"].map(g => (
                                            <SelectItem key={g} value={g}>{g}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="section">Section</Label>
                                <Select
                                    value={formData.section}
                                    onValueChange={(v) => setFormData({ ...formData, section: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["A", "B", "C"].map(s => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(v) => setFormData({ ...formData, gender: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label htmlFor="age">Age Group</Label>
                                <Select
                                    value={formData.age_group}
                                    onValueChange={(v) => setFormData({ ...formData, age_group: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Age Group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3-6">3-6 Years (Foundational)</SelectItem>
                                        <SelectItem value="6-10">6-10 Years (Formative)</SelectItem>
                                        <SelectItem value="11-16">11-16 Years (Adolescence)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Parent Details Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h4 className="text-sm font-medium text-muted-foreground">Parent Details</h4>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Map from Profile:</span>
                                <Select onValueChange={handleParentSelect}>
                                    <SelectTrigger className="w-[200px] h-8 text-xs">
                                        <SelectValue placeholder="Select Registered Parent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parents.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.full_name} ({p.mobile})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="p_name">Parent Name</Label>
                                <Input
                                    id="p_name"
                                    value={formData.parent_name}
                                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="p_contact">Contact Number</Label>
                                <Input
                                    id="p_contact"
                                    value={formData.parent_contact_number}
                                    onChange={(e) => setFormData({ ...formData, parent_contact_number: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="p_gender">Parent Gender</Label>
                                <Select
                                    value={formData.parent_gender}
                                    onValueChange={(v) => setFormData({ ...formData, parent_gender: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="locality">Locality</Label>
                                <Select
                                    value={formData.locality}
                                    onValueChange={(v) => setFormData({ ...formData, locality: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Locality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Urban">Urban</SelectItem>
                                        <SelectItem value="Semi-Urban">Semi-Urban</SelectItem>
                                        <SelectItem value="Rural">Rural</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="work">Work/Occupation</Label>
                                <Input
                                    id="work"
                                    value={formData.parent_work}
                                    onChange={(e) => setFormData({ ...formData, parent_work: e.target.value })}
                                    placeholder="e.g. Engineer, Business"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Student
                </Button>
            </DialogContent>
        </Dialog>
    )
}
