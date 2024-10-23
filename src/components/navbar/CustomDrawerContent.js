import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Dimensions, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import bitcoinImage from '../../../assets/images/bitcoin-4647175_1920.jpg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { DrawerItem } from '@react-navigation/drawer'; // Import necessary components

const CustomDrawerContent = (props) => {
    const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.5)).current; // Sidebar off-screen
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwt'); // Adjust the key as needed
        dispatch(logout());
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
        Animated.timing(slideAnim, {
            toValue: -Dimensions.get('window').width * 0, // Move sidebar off-screen
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            if (destination) {
                navigation.navigate(destination); // Navigate to the destination
            }
        });
    };

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: 'gray',
                transform: [{ translateX: slideAnim }],
            }}
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View className={'flex flex-row pb-6 justify-center mt-5'}>
                <Image
                    source={bitcoinImage}
                    className={'rounded-full ml-2'}
                    style={{ width: 50, height: 50, borderRadius: 10 }} // Adjust size as needed
                />
                <Text className="text-2xl mx-1 text-white mt-2">
                    <Text className="font-bold text-2xl text-orange-500">ItsMy </Text>
                    Treading
                </Text>
            </View>
            <View
                style={{
                    height: 1, // Line thickness
                    backgroundColor: 'white', // Line color
                    marginVertical: 10, // Spacing above and below the line
                }}
            />
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <DrawerItem
                    label="Home"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="home" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Home')}
                />
                <DrawerItem
                    label="Portfolio"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="briefcase" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Portfolio')}
                />
                <DrawerItem
                    label="Watchlist"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="star" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Watchlist')}
                />
                <DrawerItem
                    label="Activity"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="pulse" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Activity')}
                />
                <DrawerItem
                    label="Wallet"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="wallet" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Wallet')}
                />
                <DrawerItem
                    label="Payment"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="card" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Payment Details')}
                />
                <DrawerItem
                    label="Withdrawal"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="arrow-down" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Withdrawal')}
                />
                <DrawerItem
                    label="Profile"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="person" size={30} color="black" />}
                    onPress={() => handleCloseSidebar('Profile')}
                />
                <DrawerItem
                    label="Logout"
                    labelStyle={styles.drawerLabel} // Custom label style
                    icon={() => <Ionicons name="log-out" size={30} color="black" />}
                    onPress={handleLogout}
                />
            </ScrollView>
        </Animated.View>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    drawerLabel: {
        fontSize: 18, // Increase label size
        paddingVertical: 10, // Increase vertical spacing
        color: 'black', // Set label color if needed
    },
});
