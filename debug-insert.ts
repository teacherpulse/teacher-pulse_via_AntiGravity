import { createClient } from "@supabase/supabase-js"

// Hardcoded for debug purposes - utilizing the same credentials as before
const supabaseUrl = "https://xpavqosqjizepszvewcr.supabase.co"
const supabaseKey = "sb_publishable_zy_gBOv-WPmJGenB_uGCuQ_lBBSpvpQ"

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugInsert() {
    console.log("Attempting to insert a test student...")

    // Minimal valid payload based on the schema we assume exists
    const testStudent = {
        full_name: "Debug Student",
        admission_number: "DEBUG-001",
        grade_level: "10",
        section: "A",
        gender: "Male",
        age_group: "6-10",
        parent_name: "Debug Parent"
    }

    const { data, error } = await supabase.from('students').insert([testStudent]).select()

    if (error) {
        console.error("❌ Insertion Failed!")
        console.error("Error Code:", error.code)
        console.error("Error Message:", error.message)
        console.error("Error Details:", error.details)
        console.error("Error Hint:", error.hint)
    } else {
        console.log("✅ Insertion Successful!")
        console.log("Inserted Data:", data)
    }

    // Also check if we can read
    const { data: readData, error: readError } = await supabase.from('students').select('*').limit(1)
    if (readError) {
        console.error("❌ Read Failed:", readError.message)
    } else {
        console.log("✅ Read Successful. Count:", readData.length)
    }
}

debugInsert()
