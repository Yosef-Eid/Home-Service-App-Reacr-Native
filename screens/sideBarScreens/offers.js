/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import LayoutNavbar from 'components/layoutNavBar';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const Files = () => {
  const offers = [
    {
      id: 1,
      title: "Premium Cleaning Package",
      discount: "30% OFF",
      description: "Deep cleaning for your entire home with eco-friendly products",
      validUntil: "Offer valid until June 30, 2024",
      image: require('../../assets/img/service/Cleaning/a0fcc1a7186ae348ba8d98b093d70a2d.jpg'),
      isFeatured: true
    },
    {
      id: 2,
      title: "First-Time Customer Deal",
      discount: "$25 OFF",
      description: "Special discount for your first booking with us",
      validUntil: "Limited time offer",
      image: require('../../assets/img/service/Cleaning/Cleaning.jpg')
    },
    {
      id: 3,
      title: "Monthly Subscription",
      discount: "15% OFF",
      description: "Subscribe for regular cleaning and save every month",
      validUntil: "Ongoing promotion",
      image: require('../../assets/img/service/Electronics/2eafe54ffdfee65c3b455e5d7c21b499.jpg')
    },
    {
      id: 4,
      title: "Office Cleaning Special",
      discount: "20% OFF",
      description: "Professional cleaning for your workspace",
      validUntil: "Offer valid until July 15, 2024",
      image: require('../../assets/img/service/Plumbing/1a83630821885c18896232aefae5b59a.jpg')
    },
    {
      id: 5,
      title: "Office Cleaning Special",
      discount: "35% OFF",
      description: "Professional cleaning for your workspace",
      validUntil: "Offer valid until July 15, 2024",
      image: require('../../assets/img/service/Cleaning/fe6b8160a23eec7c08baf775b76b432d.jpg')
    }
  ];

  return (
    <LayoutNavbar>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EXCLUSIVE OFFERS</Text>
          <Text style={styles.headerSubtitle}>Limited-time deals for our valued customers</Text>
        </View>

        <View style={styles.featuredOfferContainer}>
          {offers.filter(o => o.isFeatured).map(offer => (
            <TouchableOpacity key={offer.id} style={styles.featuredOfferCard}>
              <Image source={offer.image} style={styles.featuredImage} />
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>FEATURED</Text>
              </View>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredDiscount}>{offer.discount}</Text>
                <Text style={styles.featuredTitle}>{offer.title}</Text>
                <Text style={styles.featuredDescription}>{offer.description}</Text>
                <View style={styles.featuredFooter}>
                  <Ionicons name="time-outline" size={16} color="white" />
                  <Text style={styles.featuredValid}>{offer.validUntil}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Current Promotions</Text>
        
        <View style={styles.offersGrid}>
          {offers.filter(o => !o.isFeatured).map(offer => (
            <TouchableOpacity key={offer.id} style={styles.offerCard}>
              <Image source={offer.image} style={styles.offerImage} />
              <View style={styles.offerContent}>
                <Text style={styles.offerDiscount}>{offer.discount}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                <View style={styles.offerFooter}>
                  <Ionicons name="time-outline" size={14} color="#6F767E" />
                  <Text style={styles.offerValid}>{offer.validUntil}</Text>
                </View>
              </View>
              <View style={styles.ribbon}>
                <Text style={styles.ribbonText}>SAVE</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>Want custom offers for your needs?</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>CONTACT OUR TEAM</Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LayoutNavbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 25,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#363F4F',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6F767E',
    marginTop: 5,
  },
  featuredOfferContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuredOfferCard: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  featuredDiscount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFD700',
    marginBottom: 5,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 15,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredValid: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#363F4F',
    marginHorizontal: 25,
    marginBottom: 15,
  },
  offersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  offerCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    position: 'relative',
  },
  offerImage: {
    width: '100%',
    height: 120,
  },
  offerContent: {
    padding: 15,
  },
  offerDiscount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6759FF',
    marginBottom: 5,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#363F4F',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 12,
    color: '#6F767E',
    marginBottom: 10,
  },
  offerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerValid: {
    fontSize: 10,
    color: '#6F767E',
    marginLeft: 5,
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    right: -20,
    backgroundColor: '#6759FF',
    paddingVertical: 3,
    paddingHorizontal: 25,
    transform: [{ rotate: '45deg' }],
  },
  ribbonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  ctaContainer: {
    backgroundColor: '#6759FF',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Files;