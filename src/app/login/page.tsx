'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { GraduationCap, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                toast.success("Account created!", {
                    description: "Please check your email to verify your account.",
                })
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.refresh()
                router.push("/dashboard")
            }
        } catch (error: any) {
            toast.error("Error", {
                description: error.message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className="size-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Teacher Pulse</CardTitle>
                    <CardDescription>
                        {isSignUp ? "Create an account to get started" : "Login to access your dashboard"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSignUp ? "Sign Up" : "Login"}
                        </Button>
                        <div className="text-center text-sm">
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="underline text-muted-foreground hover:text-primary"
                            >
                                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
