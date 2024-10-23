import React, {useState} from 'react';
import {
    Alert, Button,
    Dimensions,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import {signup} from '../../redux/slices/auth/authSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const SignupScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [show, setShow] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); // State to handle errors
    const countries = [
        {label: 'United States', value: 'us'},
        {label: 'Canada', value: 'ca'},
        {label: 'United Kingdom', value: 'uk'},
        {label: 'Australia', value: 'au'},
        {label: 'Germany', value: 'de'},
        {label: 'France', value: 'fr'},
        {label: 'Italy', value: 'it'},
        {label: 'Spain', value: 'es'},
        {label: 'India', value: 'in'},
        {label: 'Pakistan', value: 'pk'},
        {label: 'China', value: 'cn'},
        {label: 'Japan', value: 'jp'},
        {label: 'Brazil', value: 'br'},
        {label: 'Mexico', value: 'mx'},
        {label: 'South Africa', value: 'za'},
        {label: 'Russia', value: 'ru'},
        {label: 'Netherlands', value: 'nl'},
        {label: 'Sweden', value: 'se'},
        {label: 'Norway', value: 'no'},
        {label: 'Denmark', value: 'dk'},
        {label: 'Finland', value: 'fi'},
        {label: 'Argentina', value: 'ar'},
        {label: 'Chile', value: 'cl'},
        {label: 'Saudi Arabia', value: 'sa'},
        {label: 'United Arab Emirates', value: 'ae'},
        {label: 'Singapore', value: 'sg'},
        {label: 'New Zealand', value: 'nz'},
        {label: 'Ireland', value: 'ie'},
        {label: 'Portugal', value: 'pt'},
        {label: 'Philippines', value: 'ph'},
        {label: 'Bangladesh', value: 'bd'},
        {label: 'Vietnam', value: 'vn'},
    ];
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShow(false);
        if (selectedDate) {
            setDateOfBirth(currentDate); // Set the date only if a date is selected
        }
    };
    const handleSignup = async (signupData) => {
        // Basic validation
        if (!fullName) {
            setError("Full Name is required.");
            Alert.alert("Error", "Full Name is required.");
            return;
        }
        if (!email) {
            setError("Email is required.");
            Alert.alert("Error", "Email is required.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            Alert.alert("Error", "Password is required.");
            return;
        }
        if (!nationality) {
            setError("Nationality is required.");
            Alert.alert("Error", "Nationality is required.");
            return;
        }
        if (!country) {
            setError("Country is required.");
            Alert.alert("Error", "Country is required.");
            return;
        }
        if (!city) {
            setError("City is required.");
            Alert.alert("Error", "City is required.");
            return;
        }
        if (!address) {
            setError("Address is required.");
            Alert.alert("Error", "Address is required.");
            return;
        }
        if (!postalCode) {
            setError("Postal Code is required.");
            Alert.alert("Error", "Postal Code is required.");
            return;
        }
        if (!dateOfBirth) {
            setError("Date of Birth is required.");
            Alert.alert("Error", "Date of Birth is required.");
            return;
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            Alert.alert("Error", "Please enter a valid email.");
            return;
        }

        // Prepare data to send to the backend
        const data = {
            fullName,
            email,
            password,
            nationality,
            address,
            city,
            postalCode,
            country,
            dateOfBirth: dateOfBirth.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        };

        try {
            const resultAction = await dispatch(signup(data)).unwrap();
            console.log("Signup API Response:", resultAction); // Log the response from the signup action

            // Check if JWT and userId are present in the response
            if (resultAction && resultAction.jwt && resultAction.userId) {
                // Store the JWT and userId in AsyncStorage
                await AsyncStorage.setItem('token', resultAction.jwt);
                await AsyncStorage.setItem('userId', resultAction.userId); // Store the userId

                // Reset fields after successful signup
                setFullName(''); // Reset fullName
                setEmail(''); // Reset email
                setPassword(''); // Reset password
                setNationality(''); // Reset nationality
                setAddress(''); // Reset address
                setCity(''); // Reset city
                setPostalCode(''); // Reset postalCode
                setCountry(''); // Reset country
                setDateOfBirth(null); // Reset dateOfBirth

                // Navigate to ProfileImageScreen on success
                navigation.navigate('ProfileImageScreen');
            } else {
                Alert.alert("Signup successful, but no token or userId received!");
            }
        } catch (error) {
            // Handle error messages
            const errorMessage = error.message || (error.data && error.data.message) || "Signup failed!";
            Alert.alert("Error", errorMessage);
            console.log(error, "Error is");
        }
    };


    return (
        <SafeAreaView className={ios ? 'flex-1 bg-neutral-950' : 'my-0 flex-1 bg-neutral-950'}>
            <View className={'absolute justify-center items-center w-full h-full'}>
                <Svg
                    height="120"
                    width={width * 1.0}
                    style={{
                        position: 'absolute',
                        top: 0,
                        zIndex: 9999,
                        opacity: 0.5,
                    }}
                >
                    <Path
                        d={`M 0 50 A ${width * 1.0 / 4} 40 0 0 0 ${width * 1.0} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>

                <Svg
                    height="150"
                    width={width * 1.0}
                    style={{position: 'absolute', top: 180, opacity: 0.5}}
                >
                    <Path
                        d={`M 0 50 A ${width * 1.0 / 4} 50 0 0 0 ${width * 1.0} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32}}>
                <Text className="text-white text-center font-bold text-5xl mt-3 mb-8">Sign Up</Text>

                <View className="space-y-10">
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Full Name"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('fullName')}
                        onBlur={() => setFocusedInput(null)}
                        className={`bg-neutral-800 text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'fullName' ? 'border-2 border-purple-600' : ''
                        }`}
                    />

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        keyboardType="email-address"
                        className={`bg-neutral-800 text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'email' ? 'border-2 border-purple-600' : ''
                        }`}
                    />

                    <View className="relative">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor="#9ca3af"
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                            className={`bg-neutral-800 mt-2 text-white rounded-full px-4 py-5 w-full ${
                                focusedInput === 'password' ? 'border-2 border-purple-600' : ''
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

                    </View>
                    <TextInput
                        value={nationality}
                        onChangeText={setNationality}
                        placeholder="Nationality"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('nationality')}
                        onBlur={() => setFocusedInput(null)}
                        className={`bg-neutral-800  text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'nationality' ? 'border-2 border-purple-600' : ''
                        }`}
                    />
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Address"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('address')}
                        onBlur={() => setFocusedInput(null)}
                        className={`bg-neutral-800  text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'address' ? 'border-2 border-purple-600' : ''
                        }`}
                    />
                    <TextInput
                        value={city}
                        onChangeText={setCity}
                        placeholder="City"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('city')}
                        onBlur={() => setFocusedInput(null)}
                        className={`bg-neutral-800  text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'city' ? 'border-2 border-purple-600' : ''
                        }`}
                    />
                    <TextInput
                        value={postalCode}
                        onChangeText={setPostalCode}
                        placeholder="PostalCode"
                        placeholderTextColor="#9ca3af"
                        onFocus={() => setFocusedInput('postalCode')}
                        onBlur={() => setFocusedInput(null)}
                        className={`bg-neutral-800  text-white rounded-full px-4 py-5 w-full ${
                            focusedInput === 'postalCode' ? 'border-2 border-purple-600' : ''
                        }`}
                    />
                    {!country ? ( // Show the picker when no country is selected
                        <RNPickerSelect
                            onValueChange={(value) => setCountry(value)}
                            items={countries}
                            placeholder={{label: 'Select a Country...', value: null}}
                            onFocus={() => setFocusedInput('country')}
                            onBlur={() => setFocusedInput(null)}
                            style={{
                                inputIOS: {
                                    backgroundColor: '#2c3e50',
                                    color: '#ffffff',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    borderWidth: focusedInput === 'country' ? 2 : 0,
                                    borderColor: focusedInput === 'country' ? '#A855F7' : 'transparent',
                                    marginLeft: 20, // Adds space from the left
                                    marginTop: 15,  // Adds space from the top
                                },
                                inputAndroid: {
                                    backgroundColor: '#2c3e50',
                                    color: '#ffffff',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    borderWidth: focusedInput === 'country' ? 2 : 0,
                                    borderColor: focusedInput === 'country' ? '#A855F7' : 'transparent',
                                    marginLeft: 20, // Adds space from the left
                                    marginTop: 15,  // Adds space from the top
                                },
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
                        />

                    ) : ( // Show the selected country or a placeholder when a country is selected
                        <Text className={'bg-neutral-800 opacity-70 text-white rounded-full px-4 py-5 w-full'}>
                            {`Selected Country: ${country}`}
                        </Text>
                    )}

                    {!dateOfBirth && !show && (
                        <TouchableOpacity
                            className={'bg-neutral-800 opacity-70 rounded-full px-4 py-5 w-full'}
                            onPress={() => setShow(true)}
                        >
                            <Text className="text-white">Select Date of Birth</Text>
                        </TouchableOpacity>
                    )}

                    {show && (
                        <DateTimePicker
                            value={dateOfBirth || new Date()} // Use new Date() as fallback
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    {dateOfBirth && (
                        <Text
                            className={'bg-neutral-800 opacity-70  text-white rounded-full px-4 py-5 w-full'}
                            // style={{ color: '#ffffff', marginTop: 20 }}
                        >
                            {dateOfBirth.toLocaleDateString()}
                        </Text>
                    )}


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
                            onPress={handleSignup} // Use the new handleSignup function
                            className="rounded-full py-2 w-full"
                            style={{
                                backgroundColor: 'transparent',
                                alignItems: 'center',
                            }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    {error && (
                        <Text className="text-red-500 text-center mt-4">{error}</Text>
                    )}
                </View>
                <View className={'items-center align-center justify-center'}>
                    <Text className="opacity-50 text-white font-semibold text-xl mt-6 mb-8">OR</Text>
                </View>
                <View className="flex-col justify-between px-8">
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
                <View className="items-center justify-center mt-7 mb-10">
                    <Text className="text-white font-semibold text-center">
                        Have an account?{' '}
                        <Text onPress={() => navigation.navigate('LoginScreen')} className="text-purple-600 text-lg">Sign
                            In</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignupScreen;
