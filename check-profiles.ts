import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xpavqosqjizepszvewcr.supabase.co"
const supabaseKey = "sb_publishable_zy_gBOv-WPmJGenB_uGCuQ_lBBSpvpQ"

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProfilesSchema() {
    const { data, error } = await supabase.from('profiles').select('*').limit(1)

    if (error) {
        console.error('Error fetching profiles:', error)
    } else {
        console.log('Profiles columns based on first row:', data && data.length > 0 ? Object.keys(data[0]) : 'No data found')
        if (data && data.length > 0) console.log('Sample row:', data[0])
    }
}

checkProfilesSchema()
