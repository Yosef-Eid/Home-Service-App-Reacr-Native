/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeServicesOffer = () => {
    const services = [
        {
            id: 1,
            title: "Premium Cleaning Package",
            description: "Complete home cleaning with eco-friendly products",
            price: "$199",
            originalPrice: "$280",
            discount: "30% OFF",
            image: require('../assets/img/service/Cleaning/a0fcc1a7186ae348ba8d98b093d70a2d.jpg'),
            badge: "Popular"
        },
        {
            id: 2,
            title: "Disinfection Service",
            description: "Professional disinfection for your entire home",
            price: "$149",
            originalPrice: "$200",
            discount: "25% OFF",
            image: require('../assets/img/service/Cleaning/15a10c609aeeb036af6c87c4d32a8325.jpg'),
            badge: "Limited Time"
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Special Home Services</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {services.map((service) => (
                    <View key={service.id} style={styles.card}>
                        {service.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{service.badge}</Text>
                            </View>
                        )}

                        <Image source={service.image} style={styles.image} />

                        <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                            style={styles.gradient}
                        >
                            <View style={styles.discountTag}>
                                <Text style={styles.discountText}>{service.discount}</Text>
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.serviceTitle}>{service.title}</Text>
                                <Text style={styles.serviceDesc}>{service.description}</Text>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.currentPrice}>{service.price}</Text>
                                    <Text style={styles.originalPrice}>{service.originalPrice}</Text>
                                </View>
                            </View>
                        </LinearGradient>

                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookText}>Book Now</Text>
                            <Ionicons name="arrow-forward" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#363F4F',
    },
    seeAll: {
        color: '#6759FF',
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContainer: {
        paddingLeft: 15,
        paddingRight: 5,
    },
    card: {
        width: width * 0.8,
        height: 220,
        borderRadius: 15,
        marginRight: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        padding: 15,
        justifyContent: 'flex-end',
    },
    badge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#FF5C5C',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        zIndex: 2,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    discountTag: {
        position: 'absolute',
        top: -40,
        right: 15,
        backgroundColor: '#6759FF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    discountText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
    },
    textContainer: {
        marginBottom: 10,
    },
    serviceTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
    },
    serviceDesc: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
        marginRight: 10,
    },
    originalPrice: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        textDecorationLine: 'line-through',
    },
    bookButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    bookText: {
        color: 'white',
        fontWeight: '600',
        marginRight: 5,
    },
});

export default HomeServicesOffer;