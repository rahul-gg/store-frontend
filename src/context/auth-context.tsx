import React, { createContext, useContext } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

type AuthContextType = {
    session: Session | null,
    user: User | null,
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = React.useState<Session | null>(null)
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    const fetchSession = async () => {
        try {
            const response = await supabase.auth.getSession()
            // console.log(response)
            setSession(response.data.session)
            setUser(response.data.session?.user ?? null)
            setLoading(false)
        } catch (error) {
            console.log(error, 'error fetching session')
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ session, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    // console.log(context)
    if (context === undefined) {
        throw new Error('useAuth must be used within the AuthProvider')
    }
    return context
}