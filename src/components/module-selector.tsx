"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Profile } from "@/types"

const MODULES = [
    { id: 'module_classroom_teaching_mastery', name: 'Classroom Teaching Mastery (CTM)', color: 'bg-blue-100 text-blue-800' },
    { id: 'module_correction_quality_index', name: 'Correction Quality Index (CQI)', color: 'bg-green-100 text-green-800' },
    { id: 'module_learning_tools_optimization', name: 'Learning Tools Optimization (LTO)', color: 'bg-purple-100 text-purple-800' },
    { id: 'module_professional_integrity_excellence', name: 'Professional Integrity & Excellence (PIE)', color: 'bg-orange-100 text-orange-800' },
]

export default function SelectModule({ teacher }: { teacher: Profile }) {
    const router = useRouter()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {MODULES.map((m) => (
                <Card key={m.id} className="cursor-pointer hover:shadow-md transition-all" onClick={() => router.push(`/dashboard/evaluations/new?teacherId=${teacher.id}&module=${m.id}`)}>
                    <CardHeader>
                        <CardTitle className="text-lg">{m.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">Start Evaluation</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
