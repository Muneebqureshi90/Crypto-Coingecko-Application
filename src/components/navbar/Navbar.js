import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from '../../redux/slices/user/userSlice';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Use navigation hook
    const {user} = useSelector((state) => state.user);
    const firstLetter = user && user.fullName ? user.fullName[0].toUpperCase() : 'U';

    const fetchUserProfile = async () => {
        try {
            const jwt = await AsyncStorage.getItem('jwt');
            if (jwt) {
                dispatch(getUserProfile(jwt)); // Dispatch thunk to fetch user profile
            } else {
                console.warn('No JWT found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving JWT:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [dispatch]);

    return (
        <View className="">
            {/* Navbar */}
            <View
                style={{zIndex: 10}} // Ensure the navbar is below the sidebar
                className="bg-neutral-950 py-2 -pb-50 -mt-1 px-4 border-b border-gray-300 flex flex-row items-center justify-between"
            >
                <View className="flex flex-row items-center flex-1">
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{zIndex: 100}}>
                        <Ionicons name="menu" size={24} color="white"/>
                    </TouchableOpacity>

                    <Text className="text-sm md:text-lg lg:text-lg mx-4 text-white">
                        <Text className="font-bold text-orange-500">ItsMy </Text>
                        Treading
                    </Text>

                    <View className="flex flex-row items-center flex-1 border border-gray-300 rounded-full px-2 mr-4">
                        <Ionicons name="search" size={20} color="white"/>
                        <TextInput
                            className="flex-1 py-1 px-2"
                            placeholder="Search"
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>
                <View className="bg-orange-500 rounded-full justify-center items-center"
                      style={{width: 40, height: 40}}>
                    <Text className="text-white font-bold text-lg">{firstLetter}</Text>
                </View>
            </View>
        </View>
    );
};

export default Navbar;
