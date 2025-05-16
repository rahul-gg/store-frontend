import React from "react"
import { useAuth } from "../context/auth-context"
import { useNavigate } from "react-router"
import { SignInForm } from "../features/signin/components/sign-in-form"

export const SignIn = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <SignInForm />
        </div>
    )
}