/* eslint-disable prettier/prettier */
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    alert('Your message has been sent successfully! Our support team will contact you soon.');
    setMessage('');
    setName('');
    setEmail('');
  };

  const faqs = [
    {
      question: 'How can I cancel my booking?',
      answer: 'You can cancel your booking from the "My Bookings" page by clicking on the booking and then selecting "Cancel Booking".'
    },
    {
      question: 'What payment methods are available?',
      answer: 'We accept credit cards, bank transfers, and electronic payment services like Apple Pay and Google Pay.'
    },
    {
      question: 'How can I change my booking time?',
      answer: 'To change your booking time, please cancel your current booking and make a new booking at your preferred time.'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <MaterialIcons name="help-outline" size={24} color={activeTab === 'faq' ? '#6759FF' : '#6F767E'} />
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>FAQs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={activeTab === 'contact' ? '#6759FF' : '#6F767E'} />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>Contact Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'call' && styles.activeTab]}
          onPress={() => setActiveTab('call')}
        >
          <Feather name="phone-call" size={24} color={activeTab === 'call' ? '#6759FF' : '#6F767E'} />
          <Text style={[styles.tabText, activeTab === 'call' && styles.activeTabText]}>Call Us</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'faq' && (
          <View style={styles.faqContainer}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.question}>{faq.question}</Text>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        )}
        
        {activeTab === 'contact' && (
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>Send a Message to Support Team</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Type your message here..."
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
              />
            </View>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {activeTab === 'call' && (
          <View style={styles.callContainer}>
            <Text style={styles.sectionTitle}>Direct Contact Methods</Text>
            
            <View style={styles.contactMethods}>
              <TouchableOpacity 
                style={styles.contactCard}
                onPress={() => Linking.openURL('tel:+966123456789')}
              >
                <View style={styles.contactIcon}>
                  <Feather name="phone" size={24} color="#6759FF" />
                </View>
                <Text style={styles.contactTitle}>Phone Call</Text>
                <Text style={styles.contactDetail}>+966 12 345 6789</Text>
                <Text style={styles.contactSubtext}>Saturday to Thursday, 8 AM - 5 PM</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactCard}
                onPress={() => Linking.openURL('https://wa.me/966123456789')}
              >
                <View style={styles.contactIcon}>
                  <FontAwesome name="whatsapp" size={24} color="#25D366" />
                </View>
                <Text style={styles.contactTitle}>WhatsApp</Text>
                <Text style={styles.contactDetail}>+966 12 345 6789</Text>
                <Text style={styles.contactSubtext}>Quick response within 24 hours</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.contactCard}
                onPress={() => Linking.openURL('mailto:support@example.com')}
              >
                <View style={styles.contactIcon}>
                  <MaterialIcons name="email" size={24} color="#EA4335" />
                </View>
                <Text style={styles.contactTitle}>Email</Text>
                <Text style={styles.contactDetail}>support@example.com</Text>
                <Text style={styles.contactSubtext}>Response within 48 business hours</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.socialContainer}>
              <Text style={styles.socialTitle}>Follow us on social media</Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://twitter.com/example')}>
                  <FontAwesome name="twitter" size={24} color="#1DA1F2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://instagram.com/example')}>
                  <FontAwesome name="instagram" size={24} color="#E1306C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://facebook.com/example')}>
                  <FontAwesome name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  activeTab: {
    backgroundColor: '#F0EDFF',
  },
  tabText: {
    marginLeft: 8,
    color: '#6F767E',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6759FF',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#363F4F',
    marginBottom: 20,
    textAlign: 'left',
  },
  // FAQ Styles
  faqContainer: {
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#363F4F',
    marginBottom: 8,
    textAlign: 'left',
  },
  answer: {
    fontSize: 14,
    color: '#6F767E',
    lineHeight: 22,
    textAlign: 'left',
  },
  // Contact Form Styles
  contactContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6F767E',
    marginBottom: 8,
    textAlign: 'left',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6759FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Call Styles
  callContainer: {
    marginBottom: 20,
  },
  contactMethods: {
    marginBottom: 24,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    backgroundColor: '#F0EDFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#363F4F',
    marginBottom: 4,
    textAlign: 'left',
  },
  contactDetail: {
    fontSize: 14,
    color: '#6759FF',
    marginBottom: 4,
    textAlign: 'left',
    fontWeight: '500',
  },
  contactSubtext: {
    fontSize: 12,
    color: '#6F767E',
    textAlign: 'left',
  },
  socialContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#363F4F',
    marginBottom: 12,
    textAlign: 'left',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Support;