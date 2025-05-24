import type { CardType } from "../types/types"
import image from '../../../../public/vite.svg'
import { Card } from "./card"

export const CardList = () => {

    const cardData: CardType[] = [
        {
            title: 'Massive selection',
            description: 'Shop thousands of items from electronics to collectibles in just a few clicks.',
            image: image,
            imageFirst: false
        },
        {
            title: 'Easy selling',
            description: 'List your products in minutes and reach millions of potential buyers.',
            image: image,
            imageFirst: true
        }
    ]

    return (
        <div className="w-[80vw]">
            {
                cardData.map((card: CardType) => <Card title={card.title} description={card.description} image={card.image} imageFirst={card.imageFirst} />)
            }
        </div>
    )

}