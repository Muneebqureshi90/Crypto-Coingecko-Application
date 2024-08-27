import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {addCoinToWatchlist, fetchUserWatchlist} from "@/redux/slices/watchlist/watchlistSlice.js";

const Watchlist = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { watchlist, status, error } = useSelector((state) => state.watchlist);

    useEffect(() => {
        if (jwt) {
            dispatch(fetchUserWatchlist(jwt))
                .unwrap()
                .then((data) => {
                    console.log('Watchlist fetched successfully:', data);
                })
                .catch((err) => {
                    console.error('Failed to fetch watchlist:', err.message);
                    alert('There was an error fetching the watchlist. Please try again.');
                });
        } else {
            console.error('JWT is missing.');
            alert('You need to be logged in to fetch your watchlist.');
        }
    }, [dispatch, jwt]);

    const handleRemoveToWatchlist = (coinId) => {

        dispatch(addCoinToWatchlist({
            coinId:coinId,
            jwt: localStorage.getItem("jwt")
        }));        console.log(coinId);
    };

    return (
        <div className={'np-5 lg:np-20'}>
            <h1 className={'nfont-bold ntext-3xl npb-5'}>Watch List</h1>
            <Table className={'nborder'}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="npy-5">Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead className="">PRICE</TableHead>
                        <TableHead className="text-right ntext-red-600">REMOVE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(watchlist.coins) && watchlist.coins.length > 0 ? (
                        watchlist.coins.map((coin, index) => {
                            console.log('Coin object:', coin); // Log the entire coin object
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Avatar className={'-z-50'}>
                                            <AvatarImage
                                                // src={`https://coin-images.coingecko.com/coins/images/${coin.id}/large/${coin.image}`} />
                                                src={coin.image} />
                                        </Avatar>
                                        <span>{coin.name}</span>
                                    </TableCell>
                                    <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                                    <TableCell>{coin.total_volume || 'N/A'}</TableCell>
                                    <TableCell>{coin.market_cap || 'N/A'}</TableCell>
                                    <TableCell>{coin.price_change_percentage_24h || 'N/A'}</TableCell>
                                    <TableCell>${coin.current_price}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant={"ghost"} className={'nh-10 nw-10'} size={"icon"}
                                                onClick={() => handleRemoveToWatchlist(coin.id)}>
                                            <BookmarkFilledIcon className={'nw-6 nh-6'}/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan="7">No items in the watchlist.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Watchlist;
