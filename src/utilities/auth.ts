import { supabase } from "../supabase"

export const signup = async (email: string, password: string, name: string) => {
    try {
        console.log('hit')
        const response = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}