import { Navbar } from "../utilities/ui/Navbar"
import { Outlet } from "react-router"
// import React from 'react'
// import { useNavigate } from 'react-router'
import { useAuth } from '../context/auth-context'
import { Loading } from "../utilities/ui/loading"

export const Layout = () => {

    // const navigate = useNavigate()
    const { user, loading } = useAuth()

    // React.useEffect(() => {
    //     if (!loading && !user) {
    //         navigate('/signin')
    //     }
    // }, [user, loading])

    return (
        loading ? <Loading /> :
            <div>
                <Navbar user={user} />
                <Outlet />
            </div>
    )
}