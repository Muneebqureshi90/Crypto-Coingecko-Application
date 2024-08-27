import { useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table.jsx";

const WithdrawalAdmin = () => {
    const [amount, setAmount] = useState("");
    const [withdrawals, setWithdrawals] = useState([]);

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleWithdraw = () => {
        if (amount) {
            setWithdrawals([...withdrawals, { id: withdrawals.length + 1, amount }]);
            setAmount("");
        }
    };

    return (
        <div className="ncontainer nmx-auto npy-10">
            <h2 className="ntext-2xl nfont-bold">Withdrawal Administration</h2>
            <div className="nmt-6 nspace-y-4">
                <h3 className="ntext-xl">Request a Withdrawal</h3>
                <Input
                    className="npy-2 npx-4 nb-w-full nborder nrounded-md"
                    placeholder="Enter amount to withdraw..."
                    value={amount}
                    onChange={handleChange}
                />
                <Button
                    className="npy-2 npx-4 nbg-blue-500 ntext-white nrounded-md"
                    onClick={handleWithdraw}
                >
                    Submit Withdrawal
                </Button>
            </div>
            <div className="nmt-10">
                <h3 className="ntext-xl nfont-semibold">Withdrawal Requests</h3>
                <Table className="nmt-4 nb-w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {withdrawals.map((withdrawal) => (
                            <TableRow key={withdrawal.id}>
                                <TableCell>{withdrawal.id}</TableCell>
                                <TableCell>{withdrawal.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default WithdrawalAdmin;
