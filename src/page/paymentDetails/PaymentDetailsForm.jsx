import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addPaymentDetails} from "@/redux/slices/payment/paymentSlice.js";
import paymentDetails from "@/page/paymentDetails/PaymentDetails.jsx";

const PaymentDetailsForm = () => {
    const { payment } = useSelector((state) => state.payment); // Access transactions directly
    const dispatch = useDispatch();
    const form = useForm({
        resolver: "",
        defaultValues: {
            accountHolderName: "",
            ifsc: "",
            accountNumber: "",
            bankName: ""
        }
    });

    const onSubmit = (data) => {
        dispatch(addPaymentDetails({
            paymentDetails: data,
            jwt: localStorage.getItem("jwt"),
        }));
        console.log("Submitted Data:", data);
    };

    return (
        <div className={'npx-10 npy-2'}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className={'nspace-y-6'}>
                    <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({field}) => (
                            <FormItem
                            >
                                <FormLabel>Account Holder Name</FormLabel>
                                <FormControl>
                                    <Input
                                        // name={'accountHolderName'}
                                        className={'nborder nw-full nborder-gray-700 np-5'}
                                        placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ifsc"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl>
                                    <Input
                                        // name={'ifsc'}
                                        className={'nborder nw-full nborder-gray-700 np-5'}
                                        placeholder="Enter your ifsc" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({field}) => (
                            <FormItem
                            >
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input
                                        // name={'accountHolderName'}
                                        className={'nborder nw-full nborder-gray-700 np-5'}
                                        placeholder="*********5694" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmAccountNumber"
                        render={({field}) => (
                            <FormItem
                            >
                                <FormLabel>Confirm Account Number</FormLabel>
                                <FormControl>
                                    <Input name={'accountHolderName'}
                                           className={'nborder nw-full nborder-gray-700 np-5'}
                                           placeholder="confirm account number" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({field}) => (
                            <FormItem
                            >
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input name={'bankName'}
                                           className={'nborder nw-full nborder-gray-700 np-5'}
                                           placeholder="Yes Bank" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <DialogClose className={'nw-full'}>
                        <Button type={"submit"} className={"nw-full npy-5"}>Submit</Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}
export default PaymentDetailsForm