import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWithdrawalsHistory } from "@/redux/slices/withdrawal/withdrawalSlice.js";

const Withdrawal = () => {
    const dispatch = useDispatch();
    const { withdrawals } = useSelector((state) => state.withdrawal); // Use 'withdrawals' here since that's what's populated
    const { wallet } = useSelector((state) => state.wallet);
    const { paymentDetails } = useSelector((state) => state.payment);

    console.log(withdrawals)

    useEffect(() => {
        dispatch(getWithdrawalsHistory({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    return (
        <div className="np-5 lg:np-20">
            <h1 className="nfont-bold ntext-3xl npb-5">Withdrawal</h1>
            <Table className="nborder">
                <TableHeader>
                    <TableRow>
                        <TableHead className="npy-5">Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>*/}
                    {withdrawals.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <p>{new Date(item.date).toLocaleDateString()}</p> {/* Adjust this based on your date format */}
                            </TableCell>
                            <TableCell>Bank</TableCell> {/* Replace 'method' with the actual key */}
                            <TableCell>{item.amount}</TableCell>
                            <TableCell className="text-right">{item.status}</TableCell> {/* Replace 'status' with the actual key */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;
