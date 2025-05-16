import type { AuthResponse } from '@supabase/supabase-js'
import { supabase } from "../supabase"

export const signup = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
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
        return response
    } catch (error: any) {
        console.log(error)
        return error
    }
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await supabase.auth.signInWithPassword({ email, password })
        return response
    } catch (error: any) {
        console.log(error)
        return error
    }
}