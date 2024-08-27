import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";
import AssetsTable from "@/page/home/AssetsTable.jsx";
import StockChart from "@/page/home/StockChart.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {DotIcon, MessageCircle} from "lucide-react";
import {Cross1Icon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input.jsx";
import {fetchCoinList, fetchTop50CoinsByMarketCapRank} from "@/redux/slices/coins/coinSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Home = () => {
    const [category, setCategory] = useState("all");
    const [inputValue, setInputValue] = useState("")
    const [isBotRelease, setIsBotRelease] = useState(false)

    const {coins, top50Coins} = useSelector((state) => state.coin); // Get user details from user slice
    console.log(coins);
    console.log("Top 50 Coins:", top50Coins);
    const dispatch = useDispatch();

    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);
    }


    const handleCategory = (value) => {
        setCategory(value);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            console.log(inputValue)
        }
        setInputValue("")
    }
    useEffect(() => {
        console.log('Fetching top 50 coins...');
        const jwt = localStorage.getItem('jwt'); // Or however you're storing JWT
        if (jwt) {
            dispatch(fetchTop50CoinsByMarketCapRank({jwt})).then((action) => {
                if (fetchTop50CoinsByMarketCapRank.fulfilled.match(action)) {
                    console.log('Top 50 Coins fetched successfully:', action.payload);
                } else {
                    console.log('Failed to fetch Top 50 Coins:', action.error.message);
                }
            });
        } else {
            console.error('JWT is not available.');
        }
    }, [category]);


    useEffect(() => {
        const jwt = localStorage.getItem('jwt'); // Get the JWT from local storage
        if (jwt) {
            dispatch(fetchCoinList(1, jwt)) // Fetch the coin list for the first page
                .then((action) => {
                    if (fetchCoinList.fulfilled.match(action)) {
                        console.log('Coin List fetched successfully:', action.payload);
                    } else {
                        console.error('Failed to fetch Coin List:', action.error.message);
                        alert('There was an error fetching data. Please try again.');
                    }
                });
        } else {
            console.error('JWT is not available.');
            alert('Please log in to continue.');
        }
    }, [dispatch]);


    // useEffect(() => {
    //     console.log('Coins state:', coins);
    //     console.log('Top 50 Coins:', top50Coins);
    // }, [coins]);

    return (
        <div className={'nrelative'}>
            <div className={'lg:nflex'}>
                <div className={'lg:nw-[50%] lg:nborder-r'}>
                    <div className={'np-3 nflex nitems-center ngap-4 '}>
                        <Button onClick={() => handleCategory("all")}
                                variant={category === "all" ? "default" : "outline"}
                                className={'nrounded-full'}>All</Button>
                        <Button onClick={() => handleCategory("top50")}
                                variant={category === "top50" ? "default" : "outline"}
                                className={'nrounded-full'}>Top 50</Button>
                        <Button onClick={() => handleCategory("topGainers")}
                                variant={category === "topGainers" ? "default" : "outline"}
                                className={'nrounded-full'}>Top Gainers</Button>
                        <Button onClick={() => handleCategory("topLosers")}
                                variant={category === "topLosers" ? "default" : "outline"}
                                className={'nrounded-full'}>Top Losers</Button>
                    </div>

                    <AssetsTable coin={category === "all" ? coins : top50Coins || []} category={category}/>
                    {/*<AssetsTable coin={ coins } category={category}/>*/}
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#"/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#"/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                    </div>
                </div>
                <div className={'nhidden lg:nblock lg:nw-[50%] np-5'}>
                    <StockChart coinId={"bitcoin"}/>
                    <div className={'nflex ngap-3 nitems-center'}>
                        <div>
                            <Avatar>
                                <AvatarImage
                                    src={"https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"}/>
                            </Avatar>
                        </div>
                        <div>
                            <div className={'nflex nitems-center ngap-2'}>
                                <p>ETH</p>
                                <DotIcon className={'ntext-gray-400'}/>
                                <p className={'ntext-gray-400'}>Ethereum</p>
                            </div>
                            <div className={'nflex nitems-end ngap-2'}>
                                <p className={'ntext-xl nfont-bold'}>5464</p>
                                <p className={'ntext-red-600'}>
                                    <span>-1319049822.578</span>
                                    <span>(-0.29803%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Chatbot */}
            <section className={'nfixed nbottom-5 nright-5 nz-40 nflex nflex-col njustify-end nitems-end ngap-2'}>

                {isBotRelease &&
                    <div className={'nrounded-md nw-[20rem] md:nw-[25rem] lg:nw-[25rem] nh-[70vh] nbg-slate-900 '}>
                        <div className={'nflex nitems-center njustify-between nborder-b npx-12 nh-[12%]'}>
                            <p className={''}>
                                Chat Bot
                            </p>
                            <Button onClick={handleBotRelease} variant={'ghost'} size="icon"><Cross1Icon/></Button>
                        </div>
                        <div className={'nh-[76%] nflex nflex-col noverflow-y-auto ngap-5 npx-5 npy-5 nscroll-contain'}>
                            <div className={'nself-start npb-5 nw-auto'}>
                                <div className={'njustify-end nself-end npx-5 npy-5 nrounded-md nbg-slate-800 nw-auto'}>
                                    <p>hi,Muneeb Haider</p>
                                    <p>you can ask crpto related questions</p>
                                    <p>like, price, market cap extra...</p>
                                </div>
                            </div>

                            {
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,].map((item, index) =>
                                    <div key={index}
                                         className={`${index % 2 == 0 ? "nself-start" : "nself-end"} nself-start npb-5 nw-auto`}>

                                        {index % 2 == 0 ? <div
                                            className={'njustify-end nself-end npx-5 npy-5 nrounded-md nbg-slate-800 nw-auto'}>
                                            <p>prompt who are you</p>
                                        </div> : <div
                                            className={'njustify-end nself-end npx-5 npy-5 nrounded-md nbg-slate-800 nw-auto'}>
                                            <p>ans hi,Muneeb Haider</p>
                                        </div>
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className={'nh-[12%] nborder-t'}>
                            <Input className={'nw-full nh-full nborder-none outline-n'} placeholder={"write a prompt"}
                                   onClick={handleChange} value={inputValue} onKeyPress={handleKeyPress}/>
                        </div>

                    </div>
                }
                <div className={'nrelative nw-[10rem] ncursor-pointer ngroup'}>
                    <Button onClick={handleBotRelease} className={'nw-full nh-[3rem] ngap-2 nitems-center'}>
                        <MessageCircle size={30}
                                       className={'nfill-[#1e293b] -nrotate-90 nstroke-none ngroup-hover:nfill-[#1a1a1a]'}/>
                        <span className={'ntext-2xl'}>Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
