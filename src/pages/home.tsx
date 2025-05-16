import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/auth-context'

export const Home = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    React.useEffect(() => {
        if (!user) {
            navigate('/signup')
        }
    }, [user])

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            <p className="text-3xl">Home Page</p>
        </div>
    )
}