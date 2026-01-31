
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { teacherData } from './src/lib/mock-data'

const envPath = path.resolve(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const envVars = Object.fromEntries(
    envContent.split('\n')
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split('='))
)
const clean = (val: string | undefined): string => val ? val.trim() : ''
const supabase = createClient(clean(envVars.NEXT_PUBLIC_SUPABASE_URL), clean(envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY))

async function seed() {
    console.log(`Starting seed for ${teacherData.length} users...`)

    for (const user of teacherData) {
        // Map Role
        let role = 'teacher'
        if (user.role === 'Super Admin') role = 'admin'
        else if (user.role === 'HOD') role = 'hod'
        else role = 'teacher' // Default

        // Construct Email from Mobile as per request "Mobile as User ID"
        // We append a domain to make it a valid email format for Supabase Auth
        const email = `${user.mobile}@teacherpulse.in`
        const password = 'Staff@123#'

        console.log(`Processing: ${user.full_name} (${role}) - ${email}`)

        // 1. Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: user.full_name,
                    role: role,
                    mobile: user.mobile
                }
            }
        })

        if (authError) {
            console.error(`  Auth Error: ${authError.message}`)
            // If user already exists, we might want to try signing in to get ID, or just skip?
            // "User already registered" - we need the ID to update profile.
            // Since we can't search users by email with Anon key easily...
            // We'll try to SignIn?
            if (authError.message.includes("already registered")) {
                console.log("  User exists. Attempting sign-in to sync profile...")
                const { data: signInData } = await supabase.auth.signInWithPassword({ email, password })
                if (signInData.user) {
                    await upsertProfile(signInData.user.id, user, role, email)
                }
            }
            continue
        }

        if (authData.user) {
            await upsertProfile(authData.user.id, user, role, email)
        }
    }
}

async function upsertProfile(id: string, user: any, role: string, email: string) {
    // 2. Insert/Update Profile
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: id,
        full_name: user.full_name,
        email: email,
        role: role,
        designation: user.designation,
        department: user.department,
        joining_date: user.joining_date ? new Date(user.joining_date.split('-').reverse().join('-')).toISOString() : null, // dd-mm-yyyy -> iso
        mobile: user.mobile,
        status: user.status || 'active'
    })

    if (profileError) {
        console.error(`  Profile Error: ${profileError.message}`)
    } else {
        console.log(`  Success: Profile created/updated for ${user.full_name}`)
    }
}

seed()
