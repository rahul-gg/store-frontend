// import logo from '../../assets/logo.svg'
import accountLogo from '../../assets/account-dark.svg'
import { signOut } from '../auth'

export const Navbar = () => {

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="h-10 w-full flex items-center justify-between px-3 py-8">
            {/* <img src={logo} alt="logo" className='h-8 w-20' /> */}
            <a href="/" className='font-roboto font-bold text-md'>Soletrade</a>
            <div className='flex gap-5 items-center justify-center'>
                <a href="/requests" className='font-light text-sm hover:text-gray-700'>Requests</a>
                <a href="/messages" className='font-light text-sm hover:text-gray-700'>Messages</a>
                <a href="/categories" className='font-light text-sm hover:text-gray-700'>Categories</a>
                <div className="relative group">
                    <a href="/account">
                        <img src={accountLogo} alt="account" className='h-8 w-8 cursor-pointer' />
                    </a>
                    <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg hidden group-hover:block hover:block">
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</a>
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}