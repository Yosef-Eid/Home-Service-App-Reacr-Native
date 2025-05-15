/* eslint-disable prettier/prettier */
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Building from '@expo/vector-icons/FontAwesome5';
import InoIcon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Text, Animated, ImageBackground, View, Pressable, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function ServiceDetails() {
    const [units1, setUnits1] = useState(0);
    const [units2, setUnits2] = useState(0);
    const [propertyType, setPropertyType] = useState(null);
    const [description, setDescription] = useState('');
    const [showBillDetails, setShowBillDetails] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentRegion, setCurrentRegion] = useState(null);
    const mapRef = useRef(null);

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Please enable location permissions');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        setCurrentRegion(region);
        setSelectedLocation(region);

        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    const route = useRoute();
    const { service } = route.params;

    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const increase1 = () => setUnits1(units1 + 1);
    const decrease1 = () => units1 > 0 && setUnits1(units1 - 1);

    const increase2 = () => setUnits2(units2 + 1);
    const decrease2 = () => units2 > 0 && setUnits2(units2 - 1);

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 20,
        }).start();
    }, []);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date) => {
        setSelectedDate(moment(date).format('YYYY-MM-DD'));
        hideDatePicker();
    };

    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);
    const handleConfirmTime = (time) => {
        setSelectedTime(moment(time).format('hh:mm A'));
        hideTimePicker();
    };


    const handleBookNow = async () => {
        if (!propertyType) {
            Alert.alert('Error', 'Please select property type');
            return;
        }
        if (!selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please select date and time');
            return;
        }

        const newBooking = {
            id: Date.now(),
            service: service.name,
            propertyType,
            units: units1,
            bedrooms: units2,
            description,
            date: selectedDate,
            time: selectedTime,
            price: service.price,
            location: selectedLocation, 
            createdAt: new Date().toISOString()
        };

        try {
            const existingBookings = await AsyncStorage.getItem('bookings');
            let bookings = [];

            if (existingBookings) {
                bookings = JSON.parse(existingBookings);
            }

            bookings.push(newBooking);

            await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
            navigation.navigate('notification', { updatedBookings: bookings });
            Alert.alert('Success', 'Booking saved successfully!');

            setPropertyType(null);
            setUnits1(0);
            setUnits2(0);
            setDescription('');
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedLocation(null);

        } catch (error) {
            Alert.alert('Error', 'Failed to save booking');
            console.error('Error saving booking:', error);
        }
    };


    return (
        <Animated.View
            style={{ transform: [{ scale: scaleAnim }] }}
            className="flex-1 w-[90%] bg-[#F9F9F9] rounded-2xl"
        >
            <ScrollView>
                <ImageBackground style={{ paddingBottom: 100, height: 350, zIndex: 1 }} source={service.img} className="justify-between p-4 pb-">
                    <InoIcon name="arrow-back" size={24} color="white" style={{ width: 40, height: 40 }} onPress={() => navigation.goBack()} />

                    <View className='gap-4'>
                        <View className='flex-row items-center rounded-full ' style={{ width: 82, padding: 4, gap: 4, backgroundColor: '#FB9450' }}>
                            <AntDesign name="star" size={20} color="white" />
                            <View className='flex-row items-center'>
                                <Text style={{ color: 'white' }}>{service.rating}</Text>
                                <Text style={{ color: 'white' }}>({service.reviews})</Text>
                            </View>
                        </View>

                        <View>
                            <Text className='font-bold text-4xl text-white'>{service.name}</Text>
                            <Text style={{ color: '#E6E6E6' }}>{service.description}</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View className='items-center flex-1 p-4 '>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, width: '100%' }}>

                        <View style={{ width: '100%', marginTop: 16, backgroundColor: 'white', borderRadius: 16, padding: 16,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.10)' }}>
                            <View className="flex-row items-center gap-3">
                                <View className='w-1 h-4 bg-[#CABDFF]' />
                                <Text className='font-semibold text-xl'>Select Location</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setLocationModalVisible(true)}
                                style={styles.locationButton}
                            >
                                <Ionicons name="location-outline" size={24} color="#6759FF" />
                                <Text style={styles.locationButtonText}>
                                    {selectedLocation ? 'Location Selected' : 'Tap to Select Location'}
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ width: '100%', height: 174, backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', borderRadius: 16, padding: 16, gap: 16 }} >
                            <View className="flex-row items-center gap-3">
                                <View className='w-1 h-4 bg-[#CABDFF]' />
                                <Text className='font-semibold text-xl'>Type of Property</Text>
                            </View>

                            <View className='flex-row justify-between'>
                                <TouchableOpacity className='items-center gap-3' onPress={() => setPropertyType('Home')}>
                                    <View style={{
                                        width: 64,
                                        height: 64,
                                        borderColor: propertyType === 'Home' ? '#6759FF' : '#D1D3D4',
                                        backgroundColor: propertyType === 'Home' ? '#F0EDFF' : 'transparent'
                                    }} className='items-center justify-center rounded-xl border'>
                                        <View>
                                            <Feather name="home" size={24} color={propertyType === 'Home' ? '#6759FF' : '#B3B3B3'} />
                                        </View>
                                    </View>
                                    <Text style={{ color: propertyType === 'Home' ? '#6759FF' : '#000' }}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='items-center gap-3' onPress={() => setPropertyType('Office')}>
                                    <View style={{
                                        width: 64,
                                        height: 64,
                                        borderColor: propertyType === 'Office' ? '#6759FF' : '#D1D3D4',
                                        backgroundColor: propertyType === 'Office' ? '#F0EDFF' : 'transparent'
                                    }} className='items-center justify-center rounded-xl border'>
                                        <View>
                                            <Building name="building" size={24} color={propertyType === 'Office' ? '#6759FF' : '#B3B3B3'} />
                                        </View>
                                    </View>
                                    <Text style={{ color: propertyType === 'Office' ? '#6759FF' : '#000' }}>Office</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='items-center gap-3' onPress={() => setPropertyType('Vila')}>
                                    <View style={{
                                        width: 64,
                                        height: 64,
                                        borderColor: propertyType === 'Vila' ? '#6759FF' : '#D1D3D4',
                                        backgroundColor: propertyType === 'Vila' ? '#F0EDFF' : 'transparent'
                                    }} className='items-center justify-center rounded-xl border'>
                                        <View>
                                            <Ionicons name="storefront-outline" size={24} color={propertyType === 'Vila' ? '#6759FF' : '#B3B3B3'} />
                                        </View>
                                    </View>
                                    <Text style={{ color: propertyType === 'Vila' ? '#6759FF' : '#000' }}>Vila</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 136, justifyContent: 'space-between', backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', borderRadius: 16, padding: 16, }}>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-bold mb-4">Number of Units</Text>
                                <View className="flex-row gap-4 items-center">
                                    <Pressable onPress={decrease1}
                                        style={{
                                            width: 40, height: 40, borderRadius: 12, borderWidth: 1,
                                            borderColor: '#D1D3D4', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        <Ionicons name="remove-outline" size={24} color="#B4B4B4" />
                                    </Pressable>
                                    <Text className="text-xl text-[#363F4F] font-semibold">{units1}</Text>
                                    <Pressable onPress={increase1}
                                        style={{
                                            width: 40, height: 40, borderRadius: 12, borderWidth: 1,
                                            borderColor: '#D1D3D4', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        <Ionicons name="add-outline" size={24} color="#B4B4B4" />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: 1, backgroundColor: '#EEEEEE', }} />

                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-bold mb-4">Number of Bedrooms</Text>
                                <View className="flex-row gap-4 items-center">
                                    <Pressable onPress={decrease2}
                                        style={{
                                            width: 40, height: 40, borderRadius: 12, borderWidth: 1,
                                            borderColor: '#D1D3D4', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        <Ionicons name="remove-outline" size={24} color="#B4B4B4" />
                                    </Pressable>
                                    <Text className="text-xl text-[#363F4F] font-semibold">{units2}</Text>
                                    <Pressable onPress={increase2}
                                        style={{
                                            width: 40, height: 40, borderRadius: 12, borderWidth: 1,
                                            borderColor: '#D1D3D4', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        <Ionicons name="add-outline" size={24} color="#B4B4B4" />
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 174, backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', borderRadius: 16, padding: 16, gap: 16 }} >
                            <View className="flex-row items-center gap-3">
                                <View className='w-1 h-4 bg-[#CABDFF]' />
                                <Text className='font-semibold text-xl'>Description</Text>
                            </View>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <TextInput
                                    multiline
                                    placeholder="Enter your description here"
                                    placeholderTextColor="#B4B4B4"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderColor: '#D1D3D4',
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        padding: 12,
                                        color: '#363F4F',
                                        fontSize: 16,
                                        textAlignVertical: 'top',
                                    }}
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </ScrollView>
                        </View>

                        {/* data and time */}
                        <View style={{ width: '100%', height: 230, display: !showBillDetails ? 'none' : 'flex', position: 'absolute', bottom: 120, padding: 16, backgroundColor: 'white', boxShadow: '0px 0px 200px 0px rgba(0, 0, 0, 0.7)', borderRadius: 16, gap: 16 }}>

                            <View className="flex-row items-center gap-3">
                                <View className='w-1 h-4 bg-[#CABDFF]' />
                                <Text className='font-semibold text-xl'>Select your Date & Time?</Text>
                            </View>

                            <View style={{ gap: 16 }}>
                                {/* Date Picker */}
                                <TouchableOpacity onPress={showDatePicker} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 72, backgroundColor: '#FFBC99', borderRadius: 16, padding: 16, gap: 16 }}>
                                    <Ionicons name="calendar-outline" size={24} color="#6F767E" />
                                    <View>
                                        <Text style={{ color: "#6F767E" }}>Date</Text>
                                        <Text className='font-semibold'>{selectedDate || 'Select your Date'}</Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Time Picker */}
                                <TouchableOpacity onPress={showTimePicker} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 72, backgroundColor: '#B5E4CA', borderRadius: 16, padding: 16, gap: 16 }}>
                                    <Ionicons name="time-outline" size={24} color="#6F767E" />
                                    <View>
                                        <Text style={{ color: "#6F767E" }}>Time</Text>
                                        <Text className='font-semibold'>{selectedTime || 'Select your Time'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Modals */}
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirmDate}
                                onCancel={hideDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirmTime}
                                onCancel={hideTimePicker}
                            />
                        </View>

                        <View style={{
                            width: '100%', height: 116, borderRadius: 16,
                            backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', padding: 16, gap: 16
                        }}>
                            <View className='flex-row justify-between '>
                                <View className='flex-row gap-2 '>
                                    <Text style={{ color: '#6F767E' }}>Total:</Text>
                                    <Text className='font-semibold'>USD {service.price}</Text>
                                </View>

                                <TouchableOpacity onPress={() => setShowBillDetails(!showBillDetails)} className='flex-row gap-2'>
                                    <Text style={{ color: '#6759FF' }}>Bill Details</Text>
                                    <Ionicons name="chevron-up-outline" size={19} color="#6759FF" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                title="Go to Details"
                                className='w-full h-[48px] rounded-xl bg-[#6759FF] active:bg-purple-600 items-center justify-center'
                                onPress={handleBookNow}
                            >
                                <Text className='font-bold text-white'>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={locationModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select Location</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={currentRegion}
                        showsUserLocation
                        onPress={(e) => {
                            const { coordinate } = e.nativeEvent;
                            setSelectedLocation({
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            });
                        }}
                    >
                        {selectedLocation && (
                            <Marker
                                coordinate={selectedLocation}
                                title="Selected Location"
                            />
                        )}
                    </MapView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.currentLocationButton}
                            onPress={getCurrentLocation}
                        >
                            <Ionicons name="locate" size={20} color="#fff" />
                            <Text style={styles.currentLocationText}>Current Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => setLocationModalVisible(false)}
                        >
                            <Text style={styles.confirmButtonText}>Confirm Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#6759FF',
        borderRadius: 8,
        marginTop: 10,
    },
    locationButtonText: {
        marginLeft: 10,
        color: '#6759FF',
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    map: {
        flex: 1,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6759FF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    currentLocationText: {
        color: '#fff',
        marginLeft: 8,
    },
    confirmButton: {
        backgroundColor: '#6759FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});