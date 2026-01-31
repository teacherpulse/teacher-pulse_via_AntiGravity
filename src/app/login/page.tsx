'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const loginId = formData.get("loginId") as string

        console.log("Mock Login Attempt:", loginId)

        try {
            // SIMULATE SERVER DELAY
            await new Promise(resolve => setTimeout(resolve, 800))

            // MOCK LOGIN: Set cookie and redirect
            // In a real app this would happen server-side, but for this mock we do it client-side
            // or we could use a server action. For simplicity, we just set a document.cookie here
            // because middleware reads it on next request.
            document.cookie = `mock_session=${loginId}; path=/; max-age=86400; SameSite=Lax`

            console.log("Mock Login Success")
            toast.success("Welcome back!", {
                description: "Logged in successfully.",
            })

            router.refresh()
            router.push("/dashboard")

        } catch (error: any) {
            toast.error("Error", {
                description: "Something went wrong.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
            <Card className="w-full max-w-sm glass-card">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className="size-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Teacher Pulse</CardTitle>
                    <CardDescription>
                        Enter your mobile number to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="loginId">Mobile Number</Label>
                            <Input
                                id="loginId"
                                name="loginId"
                                type="text"
                                placeholder="9876543210"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password (Optional)</Label>
                            <Input id="password" name="password" type="password" placeholder="Any password works" />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
