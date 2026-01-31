
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const envVars = Object.fromEntries(
    envContent.split('\n')
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split('='))
)
const clean = (val: string | undefined): string => val ? val.trim() : ''
const supabase = createClient(clean(envVars.NEXT_PUBLIC_SUPABASE_URL), clean(envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY))

async function run() {
    console.log("Attempting to create/sign-in dev user...")

    const email = "testadmin@gmail.com"
    const password = "password123"

    // 1. Try Sign In
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (signInData.user) {
        console.log("Signed in existing dev user:", signInData.user.id)
        return
    }

    // 2. Try Sign Up
    console.log("User not found, signing up...")
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: "Dev Admin",
                role: "admin"
            }
        }
    })

    if (signUpError) {
        console.error("Sign Up Failed:", signUpError.message)
    } else {
        console.log("Signed Up New User:", signUpData.user?.id)

        // 3. Ensure Profile Exists (if trigger didn't catch it)
        if (signUpData.user) {
            const { error: profileError } = await supabase.from('profiles').upsert({
                id: signUpData.user.id,
                full_name: "Dev Admin",
                role: "admin",
                email: email
            })
            if (profileError) console.error("Profile Upsert Failed:", profileError.message)
            else console.log("Profile ensured.")
        }
    }
}

run()
