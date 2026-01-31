import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { MainHeader } from "@/components/main-header"

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    let userRole = 'teacher' // Default

    if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile) {
            userRole = profile.role
        }
    }

    return (
        <SidebarProvider>
            <div className="flex flex-col min-h-screen w-full">
                <MainHeader />
                <div className="flex flex-1 overflow-hidden">
                    <AppSidebar userRole={userRole} />
                    <SidebarInset>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    )
}
