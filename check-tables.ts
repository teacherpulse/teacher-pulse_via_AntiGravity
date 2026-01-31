
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

async function listTables() {
    console.log("Listing tables...")
    // This is a bit hacky as we can't run raw SQL easily without service role or specific permissions/RPC.
    // We will try to fetch from 'students' to confirm connection, and then try a known introspection if possible, 
    // but mostly we are blind without SQL editor access.
    // However, we can try to inspect the 'information_schema' if permitted (unlikely for anon).

    // Alternative: Try to select from potential tables and see which ones don't error.
    const potentialTables = ['students', 'profiles', 'assessments', 'parent_assessments', 'evaluations', 'parent_pulse']

    for (const table of potentialTables) {
        const { error } = await supabase.from(table).select('*').limit(1)
        if (!error) {
            console.log(`Table '${table}' EXISTS (Accessible)`)
        } else {
            if (error.code === '42P01') { // undefined_table
                console.log(`Table '${table}' DOES NOT EXIST`)
            } else {
                console.log(`Table '${table}' Error: ${error.message}`)
            }
        }
    }
}

listTables()
