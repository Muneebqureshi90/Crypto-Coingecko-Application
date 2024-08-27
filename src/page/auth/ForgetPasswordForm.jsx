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

const ForgetPasswordForm = () => {

    const form = useForm({
        resolver: "",
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (data) => {
        console.log("Data is :", data)
    }

    return (
        <div>
            <h1 className={'ntext-xl nfont-bold npb-3 ntext-center'}>Forget Password</h1>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className={'nspace-y-6'}>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        // name={'ifsc'}
                                        className={'nborder nw-full nborder-gray-700 np-5'}
                                        placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type={"submit"} className={"nw-full npy-5"}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
export default ForgetPasswordForm