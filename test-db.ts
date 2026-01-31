
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

// Handle potential carriage returns or key/value spacing
const clean = (val: string | undefined): string => val ? val.trim() : ''

const supabaseUrl = clean(envVars.NEXT_PUBLIC_SUPABASE_URL)
const supabaseKey = clean(envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY)

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials in .env.local")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    console.log("Testing Students Table...")
    const { data: students, error: sErr } = await supabase.from('students').select('*').limit(1)
    if (sErr) console.error("Students Error:", sErr.message)
    else console.log("Students Sample:", students)

    console.log("\nTesting Parents Table...")
    const { data: parents, error: pErr } = await supabase.from('parents').select('*').limit(1)
    if (pErr) console.error("Parents Error:", pErr.message)
    else console.log("Parents Sample:", parents)

    console.log("\nTesting Profiles Table (Video/Parent Pulse might use this)...")
    const { data: profiles, error: prErr } = await supabase.from('profiles').select('*').eq('role', 'parent').limit(5)
    if (prErr) console.error("Profiles Error:", prErr.message)
    else console.log("Profiles Sample:", profiles)
}

test()
