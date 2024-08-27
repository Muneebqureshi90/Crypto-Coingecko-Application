import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAllAssets} from "@/redux/slices/asset/assetSlice.js";

const Portfolio = () => {
    const dispatch = useDispatch();
    const {assets} = useSelector((state) => state.asset);

    useEffect(() => {
        dispatch(fetchAllAssets(localStorage.getItem("jwt")));
    }, [dispatch]);

    return (
        <div className="np-5 lg:np-20">
            <h1 className="nfont-bold ntext-3xl npb-5">Portfolio</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assets && assets.length > 0 ? (
                        /*{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>*/
                        assets.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            // src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}/>
                                            src={item.coin.image || "fallback-image-url"}
                                            alt={item.coin.name || "Coin Image"}
                                        />
                                    </Avatar>
                                    <span>{item.coin.name || "Loading..."}</span>
                                </TableCell>
                                <TableCell>{item.coin.symbol?.toUpperCase() || "N/A"}</TableCell>
                                <TableCell>{item.quantity || 0}</TableCell>
                                <TableCell>{item.coin.price_change_24h || "N/A"}</TableCell>
                                <TableCell>{item.coin.price_change_percentage_24h || "N/A"}</TableCell>
                                <TableCell className="text-right">{item.coin.total_volume || "N/A"}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="text-center">
                                No assets found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Portfolio;
