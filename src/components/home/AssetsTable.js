import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get('window');

const AssetsTable = ({coin = [], category}) => {
    const navigation = useNavigation();

    if (!Array.isArray(coin)) {
        console.error('Expected coin to be an array but received:', coin);
        return null;
    }

    const renderCoinItem = ({item}) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Market', {id: item.id})}
            className="flex-row items-center justify-between px-4 py-3 bg-neutral-600 border-b border-gray-300"
        >
            <View className="flex-row items-center">
                <Image
                    source={{uri: item.image}}
                    style={{
                        width: width * 0.1,
                        height: width * 0.1,
                        borderRadius: 8,
                    }}
                />
            </View>
            <Text className="text-xs mx-3 text-white">{item.symbol.toUpperCase()}</Text>
            <Text className="text-xs mx-3 text-white">{item.total_volume || 'N/A'}</Text>
            <Text className="text-xs mx-3 text-white">{item.market_cap || 'N/A'}</Text>
            <Text className="text-xs mx-3 text-white">{item.price_change_percentage_24h || 'N/A'}</Text>
            <Text className="text-xs text-right text-white">${item.current_price}</Text>
        </TouchableOpacity>
    );

    // Header for the FlatList
    const renderHeader = () => {
        if (coin.length === 0) {
            return null; // Return null or a placeholder if no coins are found
        }
        return (
            <View className="border-b border-gray-300 z-10">
                <View className="flex-row justify-between px-4 py-2 bg-neutral-600">
                    <Text className="font-bold text-sm text-white flex-1">Coin</Text>
                    <Text className="font-bold text-sm text-white flex-1">Symbol</Text>
                    <Text className="font-bold text-sm text-white flex-1">Volume</Text>
                    <Text className="font-bold text-sm text-white flex-1">Market Cap</Text>
                    <Text className="font-bold text-sm text-white flex-1">24h</Text>
                    <Text className="font-bold text-sm text-white text-right flex-1">Price</Text>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 mt-5 border border-white rounded-lg" style={{borderBottomWidth: 0}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <FlatList
                    data={coin}
                    keyExtractor={item => item.id}
                    renderItem={renderCoinItem}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-4">
                            <Text className="text-lg text-gray-500">No data available</Text>
                        </View>
                    }
                    contentContainerStyle={{paddingBottom: 20}}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    );
};

export default AssetsTable;
