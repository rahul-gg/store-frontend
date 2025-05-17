import { Navbar } from "../utilities/ui/Navbar"
import { Outlet } from "react-router"


export const Layout = () => {

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}