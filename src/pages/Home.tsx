import '../App.css'

const Home = () => {
    return (
        <div className="flex-col ml-54 mt-26 items-start">
            <text className="font-display font-bold uppercase text-3xl leading-16 text-mid-light">Pixel tales</text>
            <div className="items-start pt-5 space-x-[30px]">
                <text className="font-display font-normal uppercase text-[16px] text-light">Portfolio
                </text>
                <text className="font-display font-normal uppercase text-[16px] text-light">About
                </text>
                <text className="font-display font-normal uppercase text-[16px] text-light">Contact
                </text>
                <text className="font-display font-normal uppercase text-[16px] text-light">Blog
                </text>
            </div>
        </div>
    )
}

export default Home