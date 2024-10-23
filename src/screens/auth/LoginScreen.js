import React, {useState} from 'react';
import {Alert, Dimensions, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "../../redux/slices/auth/authSlice";
import {useDispatch} from "react-redux";
import Toast from 'react-native-toast-message'; // Assuming you're using this for toasts

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const lineWidthTop = width * 1.0;
    const lineWidthBottom = width * 1.0;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log({email, password}); // Log the user object
        setLoading(true); // Show a loader if you want
        try {
            const result = await dispatch(login({ email, password })).unwrap();

            // Store JWT in AsyncStorage
            await AsyncStorage.setItem('jwt', result.jwt);

            // Navigate to the main app screen or dashboard
            navigation.navigate('HomeScreen');
            // navigation.navigate('PortfolioScreen');

            // Optionally, show a success message
            Toast.show({
                type: 'success',
                text1: 'Login Successful!',
                position: 'top',
            });
        } catch (error) {
            console.error('Login error:', error);

            // Show a toast or alert with a relevant error message from backend
            let errorMessage = 'Login failed! Please check your email or password.';
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message; // Assuming the backend sends error messages here
            }

            Toast.show({
                type: 'error',
                text1: 'Login Error',
                text2: errorMessage,
                position: 'top',
            });
        } finally {
            setLoading(false); // Hide loader
        }
    };



    return (
        <SafeAreaView className={ios ? 'flex-1 bg-neutral-950' : 'my-0 flex-1 bg-neutral-950'}>

            <View className={'absolute justify-center items-center w-full h-full'}>
                <Svg
                    height="120"
                    width={lineWidthTop}
                    style={{
                        position: 'absolute',
                        top: 0,
                        zIndex: 9999,
                        opacity: 0.5
                    }}
                >
                    <Path
                        d={`M 0 50 A ${lineWidthTop / 4} 40 0 0 0 ${lineWidthTop} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>

                <Svg
                    height="150"
                    width={lineWidthBottom}
                    style={{position: 'absolute', top: 180, opacity: 0.5}}
                >
                    <Path
                        d={`M 0 50 A ${lineWidthBottom / 4} 50 0 0 0 ${lineWidthBottom} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32}}>
                <Text className="text-white font-bold text-5xl text-center mb-8">Sign In</Text>

                <View className="space-y-10">

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        keyboardType="email-address"
                        className={`bg-neutral-800 text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'email' ? 'border-2 border-[#6A2C91]' : ''
                        }`}
                    />

                    <View className="relative mb-20">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor="#9ca3af"
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            secureTextEntry={!showPassword}
                            className={`bg-neutral-800 text-white rounded-full px-4 py-5 w-full ${
                                focusedInput === 'password' ? 'border-2 border-[#6A2C91]' : ''
                            }`}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 20,
                                top: 18,
                            }}
                        >
                            <Icon
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={25}
                                color="#9ca3af"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log('forgetpassword')}
                            className="absolute right-0 top-full mt-2" // Position at the end of the TextInput
                            style={{
                                backgroundColor: 'transparent', // Make the background transparent
                                alignItems: 'flex-end',
                            }}
                        >
                            <Text className="text-white opacity-50 text-sm font-semibold">Forget Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <LinearGradient
                        colors={['#DC2424', '#6A2C91', '#4A569D']} // Start with red, mix in purple, end with blue
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{
                            borderRadius: 50,
                            padding: 2,
                            position: 'relative',
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleLogin}
                            className="rounded-full py-2 w-full"
                            style={{
                                backgroundColor: 'transparent', // Make the background transparent
                                alignItems: 'center',
                            }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Sign In</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    {/*<TouchableOpacity className="rounded-lg overflow-hidden shadow-lg m-3">*/}
                    {/*    <LinearGradient*/}
                    {/*        colors={['#DC2424', '#6A2C91', '#4A569D']} // Start with red, mix in purple, end with blue*/}
                    {/*        // colors={['#6A2C91', '#4A569D', '#DC2424']}*/}

                    {/*        start={{x: 0, y: 0.5}}*/}
                    {/*        end={{x: 1, y: 0.5}}*/}
                    {/*        className="px-6 py-3"*/}
                    {/*    >*/}
                    {/*        <Text className="text-white text-center uppercase">title</Text>*/}
                    {/*    </LinearGradient>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View className={'items-center align-center justify-center'}>
                    <Text className="opacity-50 text-white font-semibold  text-xl mt-6 mb-8">OR</Text>
                </View>
                <View className="flex-col  justify-between px-8">
                    <TouchableOpacity
                        onPress={() => console.log('Google Pressed')}
                        className="flex-1 mb-2 mx-2 rounded-2xl bg-neutral-800 px-4 py-4 flex-row items-center justify-center"
                        style={{paddingHorizontal: 20}}
                    >
                        <FontAwesome name="google" size={30} color="#DB4437"/>
                        <Text className="text-white font-semibold ml-3">Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Apple Pressed')}  // Handle Apple login here
                        className="flex-1 mx-2 rounded-2xl bg-neutral-800 px-4 py-4 flex-row items-center justify-center"
                        style={{paddingHorizontal: 20}}
                    >
                        <FontAwesome name="apple" size={30} color="#FFFFFF"/>
                        <Text className="text-white font-semibold ml-2">Apple</Text>
                    </TouchableOpacity>


                </View>
                <View className="items-center justify-center mt-7">
                    <Text className="text-white font-semibold  text-center">
                        Don't have an account?{' '}
                        <Text onPress={() => navigation.navigate('SignupScreen')} className=" text-purple-600 text-lg">Sign
                            Up</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
