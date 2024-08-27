import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {DotIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {BookmarkFilledIcon, BookmarkIcon} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "@/page/stockDetails/TreadingForm.jsx";
import StockChart from "@/page/home/StockChart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchCoinDetails} from "@/redux/slices/coins/coinSlice.js";
import {addCoinToWatchlist, fetchUserWatchlist} from "@/redux/slices/watchlist/watchlistSlice.js";

const StockDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const jwt = localStorage.getItem("jwt");
    const {coins} = useSelector((state) => state.coin);
    const {watchlist} = useSelector((state) => state.watchlist);

    useEffect(() => {
        if (id && jwt) {
            dispatch(fetchCoinDetails({coinId: id, jwt}))
                .then((action) => {
                    if (fetchCoinDetails.fulfilled.match(action)) {
                        console.log('Coin details fetched successfully:', action.payload);
                    } else {
                        console.error('Failed to fetch coin details:', action.error.message);
                        alert('There was an error fetching coin details. Please try again.');
                    }
                });
        } else {
            console.error('ID or JWT is missing.');
            if (!jwt) {
                alert('You need to be logged in to fetch coin details.');
            }
        }
    }, [dispatch, id, jwt]);

    const handleAddToWatchlist = () => {
        const selectedCoin = coins.find(coin => coin.id === id);
        if (selectedCoin?.id) {
            dispatch(addCoinToWatchlist({
                coinId: selectedCoin.id,
                jwt: localStorage.getItem("jwt")
            }));
        } else {
            console.error('Coin ID is missing.');
        }
    };


    // Find the specific coin by id
    const coinDetails = coins.find(coin => coin.id === id) || {};
    const isCoinInWatchlist = Array.isArray(watchlist.coins) && watchlist.coins.some(coin => coin.id === id);

    // console.log("Coin Details:", coinDetails);
    // console.log("Current Price (USD):", coinDetails?.current_price);
    // console.log("Current name:", coinDetails?.name);

    return (
        <div className={'np-5 nmt-5'}>
            <div className={'nflex njustify-between'}>
                <div className={'nflex nitems-center ngap-5'}>
                    <div>
                        <Avatar>
                            <AvatarImage
                                src={coinDetails?.image || "fallback-image-url"} // Provide fallback image URL
                            />
                        </Avatar>
                    </div>
                    <div>
                        <div className={'nflex nitems-center ngap-2'}>
                            <p>{coinDetails?.symbol?.toUpperCase() || 'Symbol'}</p>
                            <DotIcon className={'ntext-gray-400'}/>
                            <p className={'ntext-gray-400'}>{coinDetails?.name || 'Name'}</p>
                        </div>
                        <div className={'nflex nitems-center ngap-2'}>
                            <p className={'ntext-xl nfont-bold'}>
                                {coinDetails?.current_price || 'Price'}$
                            </p>
                            <p className={'ntext-red-600'}>
                <span className={''}>
                  -{coinDetails?.market_cap_change_24h || 'Change 24h'}
                </span>
                                <span className={''}>
                  (-{coinDetails?.market_cap_change_percentage_24h || 'Change %'}%)
                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={'nflex nitems-center ngap-4'}>
                    <Button onClick={handleAddToWatchlist}>
                        {isCoinInWatchlist ? (
                            <BookmarkFilledIcon className={'nh-6 nw-6'}/>
                        ) : (
                            <BookmarkIcon className={'nh-6 nw-6'}/>
                        )}
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button size={'lg'}>Tread</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>How much do you want to spend?</DialogTitle>
                            </DialogHeader>
                            <TreadingForm/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className={'nmt-10'}>
                <StockChart coinId={id}/>
            </div>
        </div>
    );
};

export default StockDetails;
