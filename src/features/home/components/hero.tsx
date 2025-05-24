import { useAuth } from "../../../context/auth-context"

export const Hero = () => {
    const { user } = useAuth()

    return (
        <div className="w-4/5 min-h-[88vh] flex flex-col items-center justify-center gap-10">
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">Buy.Sell.Thrive.</h1>
                <p className="text-4xl text-[#999999]">Discover deals on sneakers, streetwear, and more</p>
            </div>
            <a href={user ? "/categories" : "/signup"} className="bg-black hover:bg-opacity-85 text-white px-2 py-1 rounded-full">{user ? "Start Shopping" : "Sign Up Free"}</a>
        </div>
    )
}