import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
// import {ScrollArea} from "@radix-ui/react-scroll-area";

const AssetsTable = ({coin = [], category}) => {
    const navigate = useNavigate();

    if (!Array.isArray(coin)) {
        console.error('Expected coin to be an array but received:', coin);
        return null;
    }

    return (
        <div className="overflow-x-auto">

            <Table>
                <ScrollArea className={category === "all" ? "nh-[77vh]" : "nh-[82vh]"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Coin</TableHead>
                            <TableHead>SYMBOL</TableHead>
                            <TableHead>VOLUME</TableHead>
                            <TableHead>MARKET CAP</TableHead>
                            <TableHead>24h</TableHead>
                            <TableHead className="text-right">PRICE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coin.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center">No data available</TableCell>
                            </TableRow>
                        ) : (
                            /*{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>*/

                            coin.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell
                                        onClick={() => navigate(`/market/${item.id}`)}
                                        className="font-medium flex items-center gap-2">
                                        <Avatar>

                                            <AvatarImage
                                                // src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}>

                                                src={item.image}
                                            />
                                        </Avatar>
                                        <span>{item.name}</span>
                                    </TableCell>
                                    <TableCell>{item.symbol.toUpperCase()}</TableCell>
                                    <TableCell>{item.total_volume || 'N/A'}</TableCell>
                                    <TableCell>{item.market_cap || 'N/A'}</TableCell>
                                    <TableCell>{item.price_change_percentage_24h || 'N/A'}</TableCell>
                                    <TableCell className="text-right">${item.current_price}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </ScrollArea>

            </Table>
        </div>
    );
}

AssetsTable.propTypes = {
    coin: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        current_price: PropTypes.number.isRequired,
        volume: PropTypes.number, // Optional
        market_cap: PropTypes.number, // Optional
        price_change_24h: PropTypes.number, // Optional
    })).isRequired,
    category: PropTypes.string,
};

export default AssetsTable;
