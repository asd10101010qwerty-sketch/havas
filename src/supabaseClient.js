import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jixskkfyuenzoquwbidt.supabase.co'
const supabaseAnonKey = 'sb_publishable_MQKBwD4FKfk4duIU8XnHLA_dCkT39gN'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
