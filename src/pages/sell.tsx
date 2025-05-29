import { Hero } from "../features/home/components/hero"
import { CreateListingForm } from "../features/sell/components/create-listing-form"


export const Sell = () => {

    return (
        <div className="flex flex-col items-center">
            <Hero title="Share Your Product with Us" subHeading=" " buttonText="Get Started" redirectUrl="#createListing" />
            <div id="createListing" className="w-4/5 flex flex-col items-center">
                <h1 className="text-3xl font-semibold font-inter">Submit your product</h1>
                <CreateListingForm />
            </div>
        </div>
    )
}