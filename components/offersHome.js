/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const offers = [
  {
    id: 1,
    title: 'Offer Dry Cleaning',
    discount: '25%',
    cta: 'Grab Offer >',
    bgColor: '#FFE8D9',
    textColor: '#FF6B35',
  },
  {
    id: 2,
    title: 'Home Deep Cleaning',
    discount: '30%',
    cta: 'Claim Now >',
    bgColor: '#E3F2FD',
    textColor: '#1976D2',
  },
  {
    id: 3,
    title: 'Office Maintenance',
    discount: '20%',
    cta: 'Get Deal >',
    bgColor: '#E8F5E9',
    textColor: '#388E3C',
  },
  {
    id: 4,
    title: 'Carpet Cleaning',
    discount: '15%',
    cta: 'Book Now >',
    bgColor: '#F3E5F5',
    textColor: '#8E24AA',
  },
  {
    id: 5,
    title: 'Furniture Polishing',
    discount: '10%',
    cta: 'Avail Offer >',
    bgColor: '#FFF3E0',
    textColor: '#FB8C00',
  },
];

const OfferCard = ({ title, discount, cta, bgColor, textColor }) => (
  <View style={[styles.card, { backgroundColor: bgColor }]}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.discount, { color: textColor }]}>Get {discount}</Text>
      <TouchableOpacity>
        <Text style={[styles.cta, { color: textColor }]}>{cta}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const OffersHome = () => {
  const scrollViewRef = useRef(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAutoScroll = () => {
    // intervalRef.current = setInterval(() => {
    //   currentIndex.current = (currentIndex.current + 1) % offers.length;
      
    // //   if (scrollViewRef.current) {
    // //     scrollViewRef.current.scrollTo({
    // //       x: currentIndex.current * (width * 0.8 + 15),
    // //       animated: true,
    // //     });
    // //   }
      
    // //   if (currentIndex.current === offers.length - 1) {
    // //     setTimeout(() => {
    // //       currentIndex.current = 0;
    // //       scrollViewRef.current.scrollTo({ x: 0, animated: false });
    // //     }, 2000);
    // //   }
    // }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={width * 0.8 + 15}
        snapToAlignment="start"
        scrollEventThrottle={16}
        pagingEnabled
      >
        {offers.map((offer) => (
          <View key={offer.id} style={styles.cardWrapper}>
            <OfferCard
              title={offer.title}
              discount={offer.discount}
              cta={offer.cta}
              bgColor={offer.bgColor}
              textColor={offer.textColor}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    paddingVertical: 15,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  cardWrapper: {
    width: width * 0.8,
    marginRight: 15,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  textContainer: {
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  discount: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  cta: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default OffersHome;