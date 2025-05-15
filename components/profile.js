/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import LayoutNavbar from './layoutNavBar';

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        avatar: null,
        gender: '',
        dob: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                if (jsonValue) {
                    setUserData(JSON.parse(jsonValue));
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to save profile');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData({ ...userData, avatar: result.assets[0].uri });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <LayoutNavbar>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>My Profile</Text>
                    <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
                        <Text style={styles.editButton}>
                            {isEditing ? 'Save' : 'Edit'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={isEditing ? pickImage : null}>
                        {userData.avatar ? (
                            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>Add Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <View className='gap-1'>

                        <Text style={styles.name}>
                            {userData.firstName} {userData.lastName}
                        </Text>
                        <Text style={styles.username}>
                            @{userData.firstName}{userData.lastName}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>First Name</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.firstName}
                                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                            />
                        ) : (
                            <Text style={styles.detailValue}>{userData.firstName || 'Not Set'}</Text>
                        )}
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Last Name</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.lastName}
                                onChangeText={(text) => setUserData({ ...userData, lastName: text })}
                            />
                        ) : (
                            <Text style={styles.detailValue}>{userData.lastName || 'Not Set'}</Text>
                        )}
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Phone</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.phone}
                                onChangeText={(text) => setUserData({ ...userData, phone: text })}
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.detailValue}>{userData.phone || 'Not Set'}</Text>
                        )}
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Email</Text>
                        <Text style={styles.detailValue}>{userData.email}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Gender</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.gender}
                                onChangeText={(text) => setUserData({ ...userData, gender: text })}
                                placeholder="Male/Female/Other"
                            />
                        ) : (
                            <Text style={styles.detailValue}>{userData.gender || 'Not Set'}</Text>
                        )}
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Date of Birth</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.dob}
                                onChangeText={(text) => setUserData({ ...userData, dob: text })}
                                placeholder="YYYY-MM-DD"
                            />
                        ) : (
                            <Text style={styles.detailValue}>{userData.dob || 'Not Set'}</Text>
                        )}
                    </View>
                </View>
            </View>
        </LayoutNavbar>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    editButton: {
        color: '#6759FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileSection: {
        marginBottom: 30,
        flexDirection: 'row',
        gap: 10
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#666',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },

    username: {
        fontSize: 16,
        color: '#666',
    },
    detailsContainer: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 10,
    },
    detailItem: {
        padding: 15,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 16,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#6759FF',
        paddingVertical: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#e1e1e1',
        marginHorizontal: 15,
    },
});

export default Profile;