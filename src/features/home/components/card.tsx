import type { CardType } from "../types/types"

export const Card = (props: CardType) => {

    return (
        props.imageFirst ?
            <div className="w-full h-96 flex items-center justify-center">
                <div className="flex items-center justify-center w-1/2 h-full bg-gray-200 rounded-md">
                    {/* <img src={props.image} alt="img" className="w-30 h-30" /> */}
                </div>
                <div className="w-1/2 h-1/2 flex flex-col gap-3 justify-center p-5">
                    <h3 className="text-3xl font-bold">{props.title}</h3>
                    <p className="text-[#999999] text-lg font-normal">{props.description}</p>
                </div>
            </div>
            :
            <div className="w-full h-96 flex items-center justify-center">
                <div className="w-1/2 h-1/2 flex flex-col gap-3 justify-center p-5">
                    <h3 className="text-3xl font-bold">{props.title}</h3>
                    <p className="text-[#999999] text-lg font-normal">{props.description}</p>
                </div>
                <div className="flex items-center justify-center w-1/2 h-full bg-gray-200 rounded-md">
                    {/* <img src={props.image} alt="img" className="w-30 h-30" /> */}
                </div>
            </div>
    )
}