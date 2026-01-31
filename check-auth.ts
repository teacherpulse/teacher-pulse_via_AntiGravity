
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
    const email = "mohan@teacherpulse.in"
    const password = "Staff@123#"

    console.log(`Checking Login for: ${email}`)

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error("Login Failed:", error.message)
    } else {
        console.log("Login Success!", data.user.id)
        // If login works, we can try UPDATING the profile here to be sure
        await upsertProfile(data.user.id, email)
    }
}

async function upsertProfile(id: string, email: string) {
    const { error } = await supabase.from('profiles').upsert({
        id: id,
        full_name: "Mohan Kumar Suram",
        email: email,
        role: 'admin',
        mobile: "9642436669",
        department: 'Management',
        designation: 'Principal',
        status: 'active'
    })

    if (error) console.error("Profile Upsert Error:", error.message)
    else console.log("Profile Synced.")
}

run()
