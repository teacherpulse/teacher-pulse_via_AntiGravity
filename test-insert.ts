
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

async function testInsert() {
    console.log("Testing Insert...")
    const payload = {
        full_name: "Test Student",
        admission_number: "ADM001",
        grade_level: "10",
        section: "A",
        age_group: "6-10",
        // parent_id: "some-uuid", // verifying if this exists
        parent_name: "Test Parent",
        parent_contact_number: "9999999999",
        locality: "Urban",
        parent_work: "Engineer"
    }

    const { data, error } = await supabase.from('students').insert([payload]).select()

    if (error) {
        console.error("Insert Error:", error.message)
        // Check for specific column error
        if (error.message.includes('column')) {
            console.log("Likely missing column.")
        }
    } else {
        console.log("Insert Success:", data)
        // Clean up
        await supabase.from('students').delete().eq('admission_number', 'ADM001')
    }
}

testInsert()
