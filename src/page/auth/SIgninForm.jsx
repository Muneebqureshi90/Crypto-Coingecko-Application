import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from 'react-redux';
import {login} from '@/redux/slices/auth/authSlice';
import {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

const SigninForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        // console.log(data)
        try {
            const result = await dispatch(login(data)).unwrap();

            localStorage.setItem('jwt', result.jwt);

            toast.success('Login successful!');
            console.log(result);
            navigate('/');

        } catch (error) {
            toast.error('Login failed. Please try again.');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className='ntext-xl nfont-bold npb-3 ntext-center'>Login</h1>
            <ToastContainer position="bottom-center"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='nspace-y-6'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className='nborder nw-full nborder-gray-700 np-5'
                                        placeholder="Enter your email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className='nborder nw-full nborder-gray-700 np-5'
                                        placeholder="Enter your password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="nw-full npy-5" disabled={loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SigninForm;
