/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Share, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LayoutNavbar from 'components/layoutNavBar';

const ReferAFriend = () => {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!friendName || !friendEmail) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Referral submitted:', { friendName, friendEmail });
    setIsSubmitted(true);
    setFriendName('');
    setFriendEmail('');
  };

  const shareReferralLink = async () => {
    try {
      const referralLink = 'https://your-app.com/referral?code=USER123';
      const message = `Hey! I'm using this awesome service and thought you might like it too. Use my referral link to get a discount: ${referralLink}`;

      await Share.share({
        message,
        title: 'Check out this service!',
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LayoutNavbar>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="gift-outline" size={40} color="#6759FF" />
          <Text style={styles.title}>Refer a Friend</Text>
          <Text style={styles.subtitle}>Get $10 credit for each friend who signs up</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How it works</Text>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Share your unique referral link</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Your friend signs up using your link</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>You both get $10 credit when they complete their first booking</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Or enter your friend's details</Text>

          <TextInput
            style={styles.input}
            placeholder="Friend's Name"
            value={friendName}
            onChangeText={setFriendName}
          />

          <TextInput
            style={styles.input}
            placeholder="Friend's Email"
            keyboardType="email-address"
            value={friendEmail}
            onChangeText={setFriendEmail}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Invitation</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={shareReferralLink}>
          <Ionicons name="share-social-outline" size={20} color="#6759FF" />
          <Text style={styles.shareButtonText}>Share Referral Link</Text>
        </TouchableOpacity>

        {isSubmitted && (
          <View style={styles.successMessage}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.successText}>Invitation sent successfully!</Text>
          </View>
        )}

        <View style={styles.referralStats}>
          <Text style={styles.referralStatsTitle}>Your Referral Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Invites Sent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Sign Ups</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$30</Text>
              <Text style={styles.statLabel}>Earned</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LayoutNavbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#363F4F',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6F767E',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#363F4F',
    marginBottom: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6759FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#6F767E',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#363F4F',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6759FF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#6759FF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  successText: {
    color: '#4CAF50',
    marginLeft: 10,
    fontSize: 16,
  },
  referralStats: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  referralStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363F4F',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6759FF',
  },
  statLabel: {
    fontSize: 14,
    color: '#6F767E',
    marginTop: 5,
  },
});

export default ReferAFriend;