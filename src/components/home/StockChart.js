import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "../../redux/slices/coins/coinSlice";
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient"; // Use LineChart from react-native-chart-kit

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series",
        label: "1 Year",
        value: 365
    },
];

const StockChart = ({ coinId }) => {
    const [activeLabel, setActiveLabel] = useState(timeSeries[0]);
    const dispatch = useDispatch();
    const { coins } = useSelector((state) => state.coin);

    const chartData = coins?.marketChart?.chartData || [];

    useEffect(() => {
        const fetchJwtAndChart = async () => {
            try {
                if (coinId) {
                    const jwt = await AsyncStorage.getItem('jwt'); // Use AsyncStorage to get the JWT
                    if (jwt) {
                        dispatch(fetchMarketChart({ coinId, days: activeLabel.value }, jwt));
                    } else {
                        console.error('JWT token not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching JWT token:', error);
            }
        };

        fetchJwtAndChart();
    }, [dispatch, coinId, activeLabel]);

    const handleActiveLabel = (value) => {
        setActiveLabel(value);
    };

    // Example chart data and labels
    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Example labels, replace with actual
        datasets: [
            {
                data: chartData.length ? chartData : [50, 10, 40, 95, 4, 24, 85], // Replace with actual data
                color: (opacity = 1) => `rgba(117, 138, 162, ${opacity})`, // Line color
                strokeWidth: 2 // Stroke width of the line
            }
        ]
    };

    return (
        <View style={{ padding: 20 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {timeSeries.map((item) => (
                    <View key={item.label} style={{ marginHorizontal: 10 }}>
                        <LinearGradient
                            colors={
                                activeLabel.label === item.label
                                    ? ['#DC2424', '#6A2C91', '#4A569D'] // Gradient for the active label
                                    : ['transparent', 'transparent'] // Transparent for the inactive state
                            }
                            style={{
                                borderRadius: 20,
                                elevation: activeLabel.label === item.label ? 5 : 0, // Shadow for selected button
                                overflow: 'hidden', // Ensure the gradient does not exceed the border radius
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleActiveLabel(item)}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 20,
                                    backgroundColor: 'transparent', // Transparent background to show gradient
                                    borderColor: activeLabel.label === item.label ? '#FFFFFF' : '#4A90E2', // No border for active state
                                    borderWidth: activeLabel.label === item.label ? 0 : 1, // Hide border when selected
                                    alignItems: 'center', // Center the text
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{
                                    color: activeLabel.label === item.label ? '#fff' : '#758AA2', // Text color based on selection
                                    fontSize: 14,
                                    fontWeight: '600',
                                }}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>

            {/* Custom LineChart Component */}
            <View style={{
                height: 320,
                padding: 20,
                backgroundColor: '#2C2C2E',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 10 // Elevation for Android shadow
            }}>
                <LineChart
                    className={'right-2 top-2'}
                    data={lineChartData}
                    width={Dimensions.get('window').width - 60} // Slightly reduce the width for padding
                    height={260}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundGradientFrom: '#1F2937',
                        backgroundGradientTo: '#1F2937',
                        color: (opacity = 1) => `rgba(117, 138, 162, ${opacity})`, // Line color
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        decimalPlaces: 2, // Optional, defaults to 2dp
                        propsForDots: {
                            r: '5', // Dot radius increased for visibility
                            strokeWidth: '1',
                            stroke: '#fff',
                            fill: '#758AA2'
                        },
                        fillShadowGradient: '#758AA2',
                        fillShadowGradientOpacity: 0.4, // Increased opacity for better visibility
                        style: {
                            borderRadius: 16,
                        },
                        grid: {
                            borderColor: "#47535E",
                            strokeDasharray: 4,
                            show: true,
                        }
                    }}
                    bezier // Smooth line chart
                />
            </View>
        </View>
    );
};

export default StockChart;
