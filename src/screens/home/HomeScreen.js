import {
    Dimensions,
    Platform,
    Image,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    StatusBar, Button
} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Svg, {Path} from "react-native-svg";
import {SafeAreaView} from "react-native-safe-area-context";
import {Navbar} from './../../components/navbar/Navbar';
import StockChart from "../../components/home/StockChart";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchCoinList, fetchTop50CoinsByMarketCapRank} from "../../redux/slices/coins/coinSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssetsTable from "../../components/home/AssetsTable";
import {LinearGradient} from "expo-linear-gradient";
import CustomDrawerContent from "../../components/navbar/CustomDrawerContent"; // Import Ionicons

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const HomeScreen = ({navigation }) => {
    const lineWidth = width * 1.0;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [isBotRelease, setIsBotRelease] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to track Navbar visibility
    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState); // Toggle Navbar visibility
    };
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility

    const [category, setCategory] = useState("all");
    const {coins, top50Coins} = useSelector((state) => state.coin); // Get user details from user slice
    console.log(coins);
    console.log("Top 50 Coins:", top50Coins);
    const handleCategory = (value) => {
        setCategory(value);
    };
    useEffect(() => {
        console.log('Fetching top 50 coins...');
        const jwt = AsyncStorage.getItem('jwt'); // Or however you're storing JWT
        if (jwt) {
            dispatch(fetchTop50CoinsByMarketCapRank({jwt})).then((action) => {
                if (fetchTop50CoinsByMarketCapRank.fulfilled.match(action)) {
                    console.log('Top 50 Coins fetched successfully:', action.payload);
                } else {
                    console.log('Failed to fetch Top 50 Coins:', action.error.message);
                }
            });
        } else {
            console.error('JWT is not available.');
        }
    }, [category]);


    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);
    };

    const handleChange = (text) => {
        setInputValue(text);
    };

    const handleKeyPress = (event) => {
        if (event.nativeEvent.key === 'Enter') {
            // Handle send action here
            console.log('Sending message:', inputValue);
            setInputValue(''); // Clear input after sending
        }
    };
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const jwt = AsyncStorage.getItem('jwt'); // Get the JWT from local storage
        if (jwt) {
            dispatch(fetchCoinList(1, jwt)) // Fetch the coin list for the first page
                .then((action) => {
                    if (fetchCoinList.fulfilled.match(action)) {
                        console.log('Coin List fetched successfully:', action.payload);
                    } else {
                        console.error('Failed to fetch Coin List:', action.error.message);
                        alert('There was an error fetching data. Please try again.');
                    }
                });
        } else {
            console.error('JWT is not available.');
            alert('Please log in to continue.');
        }
    }, [dispatch]);
    return (
        <>

            <SafeAreaView className={ios ? 'flex-1 bg-neutral-950' : 'my-0 flex-1 bg-neutral-950'}>

            <Navbar toggleSidebar={toggleSidebar} />

                {/* Sidebar */}
                {isSidebarVisible && (
                    <CustomDrawerContent toggleSidebar={toggleSidebar} />
                )}
                <View className='absolute justify-center items-center w-full h-full'>
                    <Svg
                        height="120"
                        width={lineWidth}
                        style={{
                            position: 'absolute',
                            top: 0,
                            zIndex: 9999,
                            opacity: 0.5
                        }}
                        pointerEvents="none"
                    >
                        <Path
                            d={`M 0 50 A ${lineWidth / 4} 40 0 0 0 ${lineWidth} 50`}
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                        />
                    </Svg>

                    <Svg
                        height="150"
                        width={lineWidth}
                        style={{position: 'absolute', top: 180, opacity: 0.5}}
                        pointerEvents="none"
                    >
                        <Path
                            d={`M 0 50 A ${lineWidth / 4} 50 0 0 0 ${lineWidth} 50`}
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                        />
                    </Svg>
                </View>

                {/* Main Content */}
                <View className='flex-1  z-20'>

                    <ScrollView className={`mt-10 ${isNavbarOpen ? 'z-0' : 'z-10'}`} contentContainerStyle={{ paddingBottom: 20 }}>
                        <StockChart coinId={"bitcoin"}/>
                        <View className="flex flex-row px-3.5 space-x-2 items-center">

                            <Image
                                source={{uri: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"}}
                                style={{
                                    width: width * 0.14,  // Adjusted width to be smaller
                                    height: width * 0.14, // Adjusted height to match the new width
                                    borderRadius: 8,
                                }}
                            />
                            <View>
                                <View className="flex flex-row items-center gap-2">
                                    <Text className={'text-white font-bold'}>BitCoin</Text>
                                    <Ionicons name="ellipse" size={8} color="gray"/>
                                    <Text className="text-gray-400">BitCoin</Text>
                                </View>
                                <View className="flex flex-row items-end gap-2">
                                    <Text className=" text-white text-xl font-bold">5464</Text>
                                    <Text className="text-red-600">
                                        <Text>-1319049822.578</Text>
                                        <Text>(-0.29803%)</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="lg:w-[50%] lg:border-r p-4">
                            {/* Category Buttons */}
                            <View className="flex flex-row justify-between items-center gap-4">
                                {/* 'All' Category Button */}
                                <LinearGradient
                                    colors={
                                        category === "all"
                                            ? ['#DC2424', '#6A2C91', '#4A569D']// Colors for 'Top 50' when selected
                                            : ['#666666', '#888888'] // Darker gray gradient for default state
                                    }
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    style={{
                                        borderRadius: 50,
                                        padding: 2,
                                        position: 'relative',
                                        width: '40%',
                                        marginBottom: 10, // Add margin for spacing
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => handleCategory("all")}
                                        className="rounded-full py-2 w-full"
                                        style={{
                                            backgroundColor: 'transparent', // Make the background transparent
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text className="text-white text-center font-semibold text-lg">
                                            All
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                                {/* 'Top 50' Category Button */}
                                <LinearGradient
                                    colors={
                                        category === "top50"
                                            ? ['#DC2424', '#6A2C91', '#4A569D']// Colors for 'Top 50' when selected
                                            : ['#666666', '#888888'] // Darker gray gradient for default state
                                    }
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    style={{
                                        borderRadius: 50,
                                        padding: 2,
                                        position: 'relative',
                                        width: '40%', // Decreased width to 60%
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => handleCategory("top50")}
                                        className="rounded-full py-2 w-full"
                                        style={{
                                            backgroundColor: 'transparent', // Make the background transparent
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text className="text-white text-center font-semibold text-lg">
                                            Top 50
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>


                            </View>

                            {/* Assets Table */}
                            <AssetsTable coin={category === "all" ? coins : top50Coins || []} category={category}/>

                            {/* Pagination */}

                        </View>
                    </ScrollView>
                </View>
                <View className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                    {isBotRelease && (
                        <View className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-neutral-900">
                            <View className="flex flex-row items-center justify-between border-b px-12 h-[12%]">
                                <View className="flex flex-row items-center">
                                    <Ionicons name="chatbubble" size={24} color="white" />
                                    <Text className="text-lg text-white font-bold ml-2">Chat Bot</Text>
                                </View>
                                <TouchableOpacity onPress={handleBotRelease}>
                                    <Ionicons name="close" size={24} color="red" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-5">
                                <View className="self-start pb-5 w-auto">
                                    <View className="justify-end self-end px-5 py-5 rounded-md bg-slate-800 w-auto">
                                        <Text className={'text-white'}>hi, Muneeb Haider</Text>
                                        <Text className={'text-white'}>you can ask crypto-related questions</Text>
                                        <Text className={'text-white'}>like, price, market cap, etc...</Text>
                                    </View>
                                </View>
                                {Array.from({ length: 11 }).map((_, index) => (
                                    <View key={index} className={`self-start pb-5 w-auto ${index % 2 === 0 ? 'self-start' : 'self-end'}`}>
                                        <View className={`justify-end self-end px-5 py-5 rounded-md bg-slate-800 w-auto`}>
                                            <Text className={'text-white'}>{index % 2 === 0 ? 'prompt who are you' : 'ans hi, Muneeb Haider'}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <View className="h-[12%] border-t">
                                <TextInput
                                    className="w-full h-full px-2 border-none outline-none text-white bg-transparent"
                                    placeholder="write a prompt"
                                    placeholderTextColor="white" // Set placeholder text color to white
                                    onChangeText={handleChange}
                                    value={inputValue}
                                    onKeyPress={handleKeyPress}
                                />
                            </View>
                        </View>
                    )}
                    <TouchableOpacity className="relative w-[10rem]" onPress={handleBotRelease}>
                        <View className="flex flex-row items-center justify-center w-52 h-[48px] bg-slate-800 rounded-md shadow-lg">
                            <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
                            <Text className="text-xl ml-2 text-white">Chat Bot</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

        </>
    );
}

export default HomeScreen;
