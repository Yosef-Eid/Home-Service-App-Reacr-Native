/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import LayoutNavbar from 'components/layoutNavBar';
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Linking, Image } from "react-native";
import WebView from 'react-native-webview';

export default function Notification({ route }) {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);
    const [isWebViewReady, setIsWebViewReady] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (route.params?.updatedBookings) {
            setBookings(route.params.updatedBookings);
        }
    }, [route.params?.updatedBookings]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('bookings');
                if (jsonValue) setBookings(JSON.parse(jsonValue));
            } catch (e) {
                console.error('Failed to fetch bookings', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openBookingDetails = (booking) => {
        setSelectedBooking(booking);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setIsWebViewReady(false);
    };

    const openLocationInMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error('Failed to open maps:', err));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6759FF" />
            </View>
        );
    }

    const getPropertyIcon = (type) => {
        switch (type) {
            case 'Home': return <Feather name="home" size={20} color="#6759FF" />;
            case 'Office': return <FontAwesome5 name="building" size={20} color="#6759FF" />;
            case 'Vila': return <Ionicons name="storefront-outline" size={20} color="#6759FF" />;
            default: return <Feather name="home" size={20} color="#6759FF" />;
        }
    };

    const handleLongPress = (index) => {
        setSelectionMode(true);
        setSelectedItems([index]);
    };

    const toggleSelectItem = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(i => i !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === bookings.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(bookings.map((_, i) => i));
        }
    };

    const deleteSelected = async () => {
        const remaining = bookings.filter((_, i) => !selectedItems.includes(i));
        setBookings(remaining);
        setSelectionMode(false);
        setSelectedItems([]);
        await AsyncStorage.setItem('bookings', JSON.stringify(remaining));
    };

    return (
        <LayoutNavbar>
            <View style={styles.container}>
                {selectionMode && selectedItems.length > 0 && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <TouchableOpacity onPress={toggleSelectAll}>
                            <Text style={{ color: '#6759FF', fontWeight: 'bold' }}>
                                {selectedItems.length === bookings.length ? 'Unselect All' : 'Select All'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteSelected}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectionMode(false); setSelectedItems([]); }}>
                            <Text style={{ color: '#6F767E', fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    {bookings.length === 0 ?
                        (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ alignItems: 'center', width: '80%', gap: 13 }}>
                                <Image source={require('../assets/img/no-noti.png')} />
                                <View style={{ alignItems: 'center', width: '80%', gap: 5 }}>
                                    <Text className='font-bold text-2xl'>No Notifications!</Text>
                                    <Text style={{ color: '#B0B0B0', textAlign: 'center' }}>You dont have any notification yet. Please place order</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.locationButton}
                                    onPress={() => navigation.navigate('allServices')}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>View all services</Text>
                                </TouchableOpacity>
                            </View>

                        </View>) :
                        bookings.map((booking, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.notificationCard,
                                    selectionMode && selectedItems.includes(index) && { borderColor: '#6759FF', borderWidth: 1 },
                                ]}
                                onPress={() => selectionMode ? toggleSelectItem(index) : openBookingDetails(booking)}
                                onLongPress={() => handleLongPress(index)}
                            >

                                <View style={styles.cardHeader}>
                                    {getPropertyIcon(booking.propertyType)}
                                    <Text style={styles.cardService}>{booking.service}</Text>
                                    <View style={styles.cardStatus}>
                                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                        <Text style={styles.statusText}>Confirmed</Text>
                                    </View>
                                </View>

                                <View style={styles.cardDetails}>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="calendar-outline" size={16} color="#6F767E" />
                                        <Text style={styles.detailText}>{booking.date}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="time-outline" size={16} color="#6F767E" />
                                        <Text style={styles.detailText}>{booking.time}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardFooter}>
                                    <Text style={styles.priceText}>${booking.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>




                {/* Modal for Detailed View */}
                <Modal
                    animationType="slide"
                    transparent
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {selectedBooking && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Booking Details</Text>
                                        <TouchableOpacity onPress={closeModal}>
                                            <Ionicons name="close" size={24} color="#6F767E" />
                                        </TouchableOpacity>
                                    </View>

                                    <ScrollView style={styles.modalBody}>
                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Service Details</Text>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="brush-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>{selectedBooking.service}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Property Information</Text>
                                            <View style={styles.detailRow}>
                                                {getPropertyIcon(selectedBooking.propertyType)}
                                                <Text style={styles.detailText}>{selectedBooking.propertyType}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="people-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>{selectedBooking.units} Units</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="bed-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>{selectedBooking.bedrooms} Bedrooms</Text>
                                            </View>
                                        </View>

                                        {selectedBooking.location && (
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>Location</Text>
                                                <View style={styles.mapContainer}>
                                                    <WebView
                                                        ref={webViewRef}
                                                        originWhitelist={['*']}
                                                        source={{
                                                            html: `
                                                                <!DOCTYPE html>
                                                                <html>
                                                                <head>
                                                                    <meta charset="utf-8" />
                                                                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                                                                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                                                                    <style>
                                                                    html, body, #map { height: 100%; margin: 0; padding: 0; }
                                                                    </style>
                                                                </head>
                                                                <body>
                                                                    <div id="map"></div>
                                                                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                                                                    <script>
                                                                    var map = L.map('map').setView([${selectedBooking.location.latitude}, ${selectedBooking.location.longitude}], 15);
                                                                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                                                        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                                                                    }).addTo(map);
                                                                    L.marker([${selectedBooking.location.latitude}, ${selectedBooking.location.longitude}]).addTo(map)
                                                                        .bindPopup("Service Location").openPopup();
                                                                    </script>
                                                                </body>
                                                                </html>
                                                                `
                                                        }}
                                                        javaScriptEnabled
                                                        domStorageEnabled
                                                        style={styles.map}
                                                    />
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.detailRow}
                                                    onPress={() => openLocationInMaps(
                                                        selectedBooking.location.latitude,
                                                        selectedBooking.location.longitude
                                                    )}
                                                >
                                                    <Ionicons name="location-outline" size={20} color="#6759FF" />
                                                    <Text style={[styles.detailText, styles.locationLink]}>
                                                        View in Maps
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="information-circle-outline" size={20} color="#6F767E" />
                                                    <Text style={styles.detailText}>
                                                        Latitude: {selectedBooking.location.latitude.toFixed(4)}, Longitude: {selectedBooking.location.longitude.toFixed(4)}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Schedule</Text>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="calendar-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>{selectedBooking.date}</Text>
                                            </View>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="time-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>{selectedBooking.time}</Text>
                                            </View>
                                        </View>

                                        {selectedBooking.description && (
                                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>Additional Notes</Text>
                                                <View style={styles.detailRow}>
                                                    <Ionicons name="document-text-outline" size={20} color="#6F767E" />
                                                    <Text style={styles.detailText}>{selectedBooking.description}</Text>
                                                </View>
                                            </View>
                                        )}

                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Payment</Text>
                                            <View style={styles.detailRow}>
                                                <Ionicons name="wallet-outline" size={20} color="#6F767E" />
                                                <Text style={styles.detailText}>Total: ${selectedBooking.price}</Text>
                                            </View>
                                        </View>
                                    </ScrollView>

                                    <View style={styles.modalFooter}>
                                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                            <Text style={styles.closeButtonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </LayoutNavbar>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
    },
    scrollContainer: {
        padding: 16,
        flex: 1
    },
    notificationCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.10)',
        shadowRadius: 4,
        // elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardService: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#363F4F',
    },
    cardStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#4CAF50',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#6F767E',
    },
    cardFooter: {
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6759FF',
    },
    noBookingText: {
        fontSize: 16,
        color: '#6F767E',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 16,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#363F4F',
    },
    modalBody: {
        padding: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#363F4F',
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    closeButton: {
        backgroundColor: '#6759FF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    mapContainer: {
        height: 200,
        width: '100%',
        marginVertical: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    map: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    locationLink: {
        color: '#6759FF',
        textDecorationLine: 'underline',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6759FF',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,

    }
});