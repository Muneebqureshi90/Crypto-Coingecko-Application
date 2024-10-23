import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Dimensions, Platform, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAllAssets} from '../../redux/slices/asset/assetSlice';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from "../../components/navbar/Navbar";
import CustomDrawerContent from "../../components/navbar/CustomDrawerContent";

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const Portfolio = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {assets} = useSelector(state => state.asset);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility

    useEffect(() => {
        const getJwtToken = async () => {
            const token = await AsyncStorage.getItem('jwt');
            if (token) {
                dispatch(fetchAllAssets(token));
            }
        };
        getJwtToken();
    }, [dispatch]);

    const renderAssetRow = ({item}) => (
        <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-3 bg-neutral-600 border-b border-gray-300"
            onPress={() => navigation.navigate('AssetDetails', {id: item.id})}
        >
            <View className="flex-row items-center">
                <Image
                    source={{uri: item.coin.image || 'fallback-image-url'}}
                    className="w-12 h-12 rounded-md"
                />
                <Text className="text-xs text-white mx-16">{item.coin.symbol?.toUpperCase() || 'N/A'}</Text>
                <Text className="text-xs text-white mx-6">{item.quantity || 0}</Text>
                <Text className="text-xs text-white mx-10">{item.coin.current_price || 'N/A'}</Text>
                <Text className="text-xs text-white mx-8">{item.coin.price_change_percentage_24h || 'N/A'}</Text>
                <Text className="text-xs text-white mx-8">{item.coin.total_volume || 'N/A'}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderTableHeader = () => (
        <View className="border-b border-gray-300">
            <View className="flex-row justify-between px-4 py-2 bg-neutral-700">
                <Text className="font-bold text-sm text-white mx-6">Coin</Text>
                <Text className="font-bold text-sm text-white mx-3">Symbol</Text>
                <Text className="font-bold text-sm text-white mx-6">Unit</Text>
                <Text className="font-bold text-sm text-white mx-8">Price</Text>
                <Text className="font-bold text-sm text-white mx-8">Change</Text>
                <Text className="font-bold text-sm text-white mx-8">Volume</Text>
            </View>
        </View>
    );

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <SafeAreaView className={ios ? 'flex-1 bg-neutral-950' : 'my-0 flex-1 bg-neutral-950'}>
            <Navbar toggleSidebar={toggleSidebar}/>

            {/* SVG Decorations */}
            <View className="absolute justify-center items-center w-full h-full">
                <Svg
                    height="120"
                    width={width}
                    style={{
                        position: 'absolute',
                        top: 0,
                        opacity: 0.5,
                    }}
                    pointerEvents="none"
                >
                    <Path
                        d={`M 0 50 A ${width / 4} 40 0 0 0 ${width} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>

                <Svg
                    height="150"
                    width={width}
                    style={{position: 'absolute', top: 180, opacity: 0.5}}
                    pointerEvents="none"
                >
                    <Path
                        d={`M 0 50 A ${width / 4} 50 0 0 0 ${width} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            </View>

            {/* Combined ScrollView */}
            <ScrollView horizontal>
                {/* Adjusted max height and flex of the container */}
                <View className="m-2 mt-7 border border-white rounded-lg max-h-64 flex-grow">
                    {assets && assets.length > 0 ? (
                        <>
                            {renderTableHeader()}
                            <FlatList
                                data={assets}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderAssetRow}
                                contentContainerStyle={{paddingBottom: 1}}
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                    ) : (
                        <View className="flex-1 items-center bg-black justify-center py-4">
                            <Text className="text-lg text-white">No assets found</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Sidebar should be here if needed */}
            {isSidebarVisible && <CustomDrawerContent toggleSidebar={toggleSidebar}/>}
        </SafeAreaView>
    );
};

export default Portfolio;
