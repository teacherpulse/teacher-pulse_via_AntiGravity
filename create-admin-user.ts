
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
    // Mohan Kumar Suram - Admin
    const email = "admin.fallback@teacherpulse.in"
    const password = "Staff@123#"
    const fullName = "Mohan Kumar Suram"
    const mobile = "9642436669"

    console.log(`Creating Admin: ${fullName} (${email})...`)

    // 1. Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: 'admin',
                mobile: mobile
            }
        }
    })

    if (authError) {
        console.error(`Auth Error: ${authError.message}`)
        if (authError.message.includes("already registered")) {
            console.log("User exists. Trying to update profile...")
            // If exist, we can't easily get ID without login, but let's try login
            const { data: signInData } = await supabase.auth.signInWithPassword({ email, password })
            if (signInData.user) {
                await upsertProfile(signInData.user.id, fullName, mobile, email)
            }
        }
    } else if (authData.user) {
        console.log(`User created! ID: ${authData.user.id}`)
        await upsertProfile(authData.user.id, fullName, mobile, email)
    }
}

async function upsertProfile(id: string, fullName: string, mobile: string, email: string) {
    const { error } = await supabase.from('profiles').upsert({
        id: id,
        full_name: fullName,
        email: email,
        role: 'admin', // Ensure explicit admin role
        mobile: mobile,
        department: 'Management',
        designation: 'Principal'
    })

    if (error) console.error("Profile Error:", error.message)
    else console.log("Profile updated successfully for Admin.")
}

run()
