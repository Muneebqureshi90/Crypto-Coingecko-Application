import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Dimensions, Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { CameraIcon, PlusIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { uploadUserImage } from "../../redux/slices/auth/authSlice"; // Import the upload action
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit'; // Ensure to import createAsyncThunk if it's in the same file

const { width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

const ProfileImageScreen = () => {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const pickImage = async () => {
        // Request permission to access the gallery
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access gallery is required!");
            return;
        }

        // Pick an image from the gallery
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        // Request permission to use the camera
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera is required!");
            return;
        }

        // Take a photo using the camera
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleProfile = async () => {
        if (!image) {
            Alert.alert("Please select an image first!");
            return;
        }

        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            Alert.alert("User ID is not available. Please login again.");
            return;
        }

        const formData = {
            userId: userId,
            imageFile: {
                uri: image,
                name: `profile-image-${userId}.jpg`,
                type: 'image/jpeg',
            },
        };

        try {
            const resultAction = await dispatch(uploadUserImage(formData)).unwrap();
            Alert.alert("Image uploaded successfully!");
            navigation.navigate('SuccessSetup');
        } catch (error) {
            // Inspect the error structure
            console.log(error); // Log the entire error to understand its structure
            const errorMessage = error.message || error.data?.message || "Image upload failed!";
            Alert.alert("Error", errorMessage);
        }
    };


    return (
        <SafeAreaView className={ios ? 'flex-1 bg-neutral-950' : 'my-0 flex-1 bg-neutral-950'}>
            <View className={'absolute justify-center items-center w-full h-full'}>
                <Svg
                    height="120"
                    width={width * 1.0}
                    style={{ position: 'absolute', top: 0, zIndex: 9999, opacity: 0.5 }}
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
                    style={{ position: 'absolute', top: 180, opacity: 0.5 }}
                >
                    <Path
                        d={`M 0 50 A ${width * 1.0 / 4} 50 0 0 0 ${width * 1.0} 50`}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            </View>
            <Text className={'text-white text-xl text-center'}>Profile Photo</Text>

            <View className="mt-20 items-center justify-center">
                {/* Dotted Circle */}
                <Svg height="250" width="250">
                    <Circle
                        cx="125"
                        cy="125"
                        r="120"
                        stroke="white"
                        strokeWidth="3"
                        strokeDasharray="12,20"
                        fill="none"
                    />
                </Svg>

                <TouchableOpacity
                    style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}
                    onPress={takePhoto}
                    onLongPress={pickImage}
                >
                    <View style={{ position: 'relative' }}>
                        <CameraIcon size={70} color="#ADFF2F" />
                        {/* Plus Icon in the bottom-right corner */}
                        <View className={'bg-blue-700 rounded-full'} style={{ position: 'absolute', bottom: -1, right: -5 }}>
                            <PlusIcon size={24} color="white" />
                        </View>
                    </View>
                    <Text style={{ color: 'white', fontSize: 14, marginTop: 2 }} className={'opacity-90'}>Take a Photo</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }} />
            )}

            <Text className={'text-white mt-4 opacity-90 text-center'}>Take a photo or choose from</Text>
            <Text className={'text-white opacity-90 text-center mb-10'}>your library</Text>
            <LinearGradient
                colors={['#DC2424', '#6A2C91', '#4A569D']} // Start with red, mix in purple, end with blue
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 25, // Adjusted borderRadius for a smaller button
                    paddingVertical: 12, // Increased vertical padding for a larger button height
                    paddingHorizontal: 20, // Horizontal padding for better width
                    width: width * 0.8, // Set a specific width as 80% of the screen width
                    alignSelf: 'center', // Center the button
                    marginTop: 30, // Add some spacing from the previous element
                }}
            >
                <TouchableOpacity
                    onPress={handleProfile}
                    className="rounded-full"
                    style={{
                        backgroundColor: 'transparent', // Make the background transparent
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text className="text-white text-center font-semibold text-lg">Upload Profile Image</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ProfileImageScreen;
