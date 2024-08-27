import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    Form,
    FormControl,
    FormItem,
    FormMessage
} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {signup} from "@/redux/slices/auth/authSlice";
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    const navigate = useNavigate(); // Initialize navigate function

    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data) => {
        if (!data.fullName || !data.email || !data.password) {
            return;
        }
        try {

            const resultAction = await dispatch(signup(data)).unwrap();

            // Extract JWT from the response and store it in localStorage
            if (resultAction && resultAction.jwt) {
                localStorage.setItem('token', resultAction.jwt);
                toast.success("Signup successful!");
                navigate('/');
            } else {
                toast.error("Signup successful, but no token received!");
            }
        } catch (error) {
            toast.error(error || "Signup failed!");
        }
    };

    return (
        <div className={'npx-10 npy-2'}>
            <h1 className={'ntext-xl nfont-bold npb-3 ntext-center'}>Signup</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'nspace-y-6'}>
                    <FormItem>
                        <FormControl>
                            <Input
                                {...form.register("fullName")}
                                className={'nborder nw-full nborder-gray-700 np-5'}
                                placeholder="Enter your name"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                    <FormItem>
                        <FormControl>
                            <Input
                                {...form.register("email")}
                                className={'nborder nw-full nborder-gray-700 np-5'}
                                placeholder="Enter your email"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                    <FormItem>
                        <FormControl>
                            <Input
                                {...form.register("password")}
                                type="password"
                                className={'nborder nw-full nborder-gray-700 np-5'}
                                placeholder="Enter your password"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                    <Button type="submit" className={"nw-full npy-5"} disabled={loading}>
                        {loading ? "Signing up..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;
