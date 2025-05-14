import { supabase } from "../supabase"

export const signup = async (email: string, password: string) => {
        try {
            const response = await supabase.auth.signUp({ email: email, password: password })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }