import { useAuth } from "../../../context/auth-context"

type Props = {
    title: string
    subHeading: string
    buttonText: string
    redirectUrl: string
}

export const Hero = (props: Props) => {
    const { user } = useAuth()

    return (
        <div className="w-4/5 min-h-[88vh] flex flex-col items-center justify-center gap-10">
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">{props.title}</h1>
                <p className="text-4xl text-[#999999]">{props.subHeading}</p>
            </div>
            <a href={user ? props.redirectUrl : "/signup"} className="bg-black hover:bg-opacity-85 text-white px-2 py-1 rounded-full">{user ? props.buttonText : "Sign Up Free"}</a>
        </div>
    )
}