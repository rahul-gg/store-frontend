import React from "react"
import { useAuth } from "../context/auth-context"
import { SignUpForm } from "../features/signup/components/sign-up-form"
import { useNavigate } from "react-router"

export const SignUp = () => {
    const { loading, user } = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <SignUpForm />
        </div>
    )
}