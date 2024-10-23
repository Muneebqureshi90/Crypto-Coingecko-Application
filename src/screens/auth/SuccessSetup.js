import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Svg, { Path, Circle, Defs, Stop, LinearGradient } from "react-native-svg";
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const SuccessSetup = ({onSubmit}) => {
    const navigation = useNavigation();

    const lineWidthTop = width * 1.0;
    const lineWidthBottom = width * 1.0;

    const handleSubmit = () => {
        navigation.navigate('LoginScreen')
        console.log('Circle with tick icon tapped!');

    };

    const smallCirclesPositions1 = [
        {cx: 95, cy: 10},  // Top

    ];
    const smallCirclesPositions2 = [
        {cx: 92, cy: 35},  // Top-right

    ];
    const smallCirclesPositions3 = [

        {cx: 91, cy: 85},  // Bottom-right

    ];
    const smallCirclesPositions4 = [

        {cx: 30, cy: 92},  // Bottom

    ];
    const smallCirclesPositions5 = [

        {cx: 5, cy: 45},  // Bottom-left

    ];
    const smallCirclesPositions6 = [

        {cx: 24, cy: 18},  // Top-left
    ];
    const smallCirclesPositions7 = [

        {cx: 40, cy: 2},  // Top-left
    ];

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
            <View className="items-center justify-center mt-5 flex-1">
                <View className="mt-5  border-2 border-gray-200 rounded-3xl border-opacity-20 bg-neutral-900 p-6 px-4 mb-10">
                    <TouchableOpacity onPress={handleSubmit} className="z-10 items-center p-16 justify-center">
                        <Svg height="180" width="180" viewBox="-2 -5 105 100">
                            <Defs>
                                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <Stop offset="0%" stopColor="#DC2424" stopOpacity="1" />
                                    <Stop offset="50%" stopColor="#6A2C91" stopOpacity="1" />
                                    <Stop offset="100%" stopColor="#4A569D" stopOpacity="1" />
                                </LinearGradient>
                            </Defs>
                            <Circle cx="50" cy="50" r="36" fill="url(#grad)"/>
                            <Path
                                d="M32 50 L45 65 L70 40"
                                stroke="white"
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                            />
                            {smallCirclesPositions1.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="8"
                                    fill="url(#grad)"
                                />
                            ))}
                            {smallCirclesPositions2.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="3"
                                    fill="white"
                                />
                            ))}
                            {smallCirclesPositions3.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="4"
                                    fill="url(#grad)"
                                />
                            ))}
                            {smallCirclesPositions4.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="2"
                                    fill="white"
                                />
                            ))}
                            {smallCirclesPositions5.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="4"
                                    fill="url(#grad)"
                                />
                            ))}
                            {smallCirclesPositions6.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="1"
                                    fill="white"
                                />
                            ))}
                            {smallCirclesPositions7.map((pos, index) => (
                                <Circle
                                    key={index}
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r="4"
                                    fill="url(#grad)"
                                />
                            ))}
                        </Svg>
                    </TouchableOpacity>
                    <View className={'justify-center items-center'}>
                        <Text className={'text-white text-2xl'}>Success</Text>
                        <Text className={'text-white opacity-70 text-ex mt-8'}>Your account has been</Text>
                        <Text className={'text-white opacity-70 text-ex'}>created!</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SuccessSetup;
