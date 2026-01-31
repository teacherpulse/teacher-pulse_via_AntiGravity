
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
    console.log("Checking Profiles...")
    const { data: profiles, error } = await supabase.from('profiles').select('*').limit(5)

    if (error) {
        console.error("Error reading profiles:", error.message)
    } else {
        console.log(`Found ${profiles.length} profiles.`)
        if (profiles.length > 0) {
            console.log("First Profile ID:", profiles[0].id)
        } else {
            console.log("No profiles found. Attempting to insert dummy...")
            // Attempt insert - this will likely fail if FK constraint is active and user doesn't exist in auth.users
            const dummyId = "00000000-0000-0000-0000-000000000000"
            const { data, error: insertError } = await supabase.from('profiles').insert({
                id: dummyId,
                full_name: "Dev Admin",
                role: "admin",
                email: "dev@example.com"
            }).select()

            if (insertError) {
                console.error("Insert failed (likely FK constraint):", insertError.message)
            } else {
                console.log("Dummy profile inserted successfully!", data)
            }
        }
    }
}

run()
