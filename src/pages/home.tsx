import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/auth-context'

export const Home = () => {
    const navigate = useNavigate()
    const { user, loading } = useAuth()

    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/signin')
        }
    }, [user,loading])

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            <p className="text-3xl">Home Page</p>
        </div>
    )
}