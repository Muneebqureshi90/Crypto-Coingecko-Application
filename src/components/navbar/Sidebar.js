import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Image, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import bitcoinImage from '../../../assets/images/bitcoin-4647175_1920.jpg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logout} from "../../redux/slices/auth/authSlice";
import {useDispatch} from "react-redux";

const Sidebar = ({toggleSidebar}) => {
    const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.5)).current; // Sidebar off-screen
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // Remove user data from AsyncStorage
        await AsyncStorage.removeItem('jwt'); // Adjust the key as needed

        // Dispatch the logout action to reset the state
        dispatch(logout());

        // Navigate to the LoginScreen
        navigation.navigate('LoginScreen');
    };
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0, // Show sidebar
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleCloseSidebar = (destination) => {
        // Slide out animation
        Animated.timing(slideAnim, {
            toValue: -Dimensions.get('window').width * 0.5, // Move sidebar off-screen
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            toggleSidebar(); // Toggle sidebar visibility after animation
            if (destination) {
                navigation.navigate(destination); // Navigate to the destination
            }
        });
    };

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '50%',
                backgroundColor: 'gray',
                transform: [{translateX: slideAnim}],
            }}
            className={'z-10'}
        >

            <TouchableOpacity
                className="absolute top-4 right-4"
                onPress={() => handleCloseSidebar(null)} // Close without navigation
            >
                <Ionicons name="close" size={24} color="white"/>
            </TouchableOpacity>
            <View className="flex flex-row items-center mt-10">
                <Image
                    source={bitcoinImage}
                    className={'rounded-full  ml-2'}
                    style={{width: 50, height: 50, borderRadius: 10}} // Adjust size as needed
                />
                <Text className="text-lg mx-1 text-white">
                    <Text className="font-bold text-orange-500">ItsMy </Text>
                    Treading
                </Text>
            </View>
            <ScrollView className="flex-1 space-y-3 mt-10 text-center">
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Home')}>
                    <Ionicons name="home" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Portfolio')}>
                    <Ionicons name="briefcase" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Watchlist')}>
                    <Ionicons name="star" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Watchlist</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Activity')}>
                    <Ionicons name="pulse" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Wallet')}>
                    <Ionicons name="wallet" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Payment Details')}>
                    <Ionicons name="card" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Payment Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Withdrawal')}>
                    <Ionicons name="arrow-down" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Withdrawal</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={() => handleCloseSidebar('Profile')}>
                    <Ionicons name="person" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-4 flex flex-row items-center justify-center border-b border-gray-600"
                                  onPress={handleLogout}>
                    <Ionicons name="log-out" size={26} color="black"/>
                    <Text className="text-lg text-black ml-2">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </Animated.View>
    );
};

export default Sidebar;
