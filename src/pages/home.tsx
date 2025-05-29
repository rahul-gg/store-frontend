// import React from 'react'
import { Hero } from "../features/home/components/hero"
import { CardList } from "../features/home/components/card-list"
import { Outro } from "../features/home/components/outro"


export const Home = () => {

    return (
        <div className="flex flex-col items-center gap-10">
            <Hero title="Buy.Sell.Thrive." subHeading="Discover deals on sneakers, streetwear, and more" buttonText="Start Shopping" redirectUrl="/categories"/>
            <div>
                <CardList />
            </div>
            <Outro />
        </div>
    )
}