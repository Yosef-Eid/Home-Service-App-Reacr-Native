/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

export default function CustomDrawerContent(props) {
    const { navigation } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const data = JSON.parse(storedUser);
            setUser(data);
        };
        checkUser();
    }, []);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View className='justify-between flex-1'>
                <View className="gap-11">
                    {/* profile */}
                    <TouchableOpacity
                        className=" w-[300px] flex-row items-center gap-3 pt-5"
                        onPress={() => navigation.navigate('profile')}>
                        {user?.avatar ? (
                            <Image
                                source={user?.avatar ? { uri: user.avatar } : ''}
                                style={{
                                    borderColor: '#A3A3A3',
                                    width: 60,
                                    height: 60,
                                }}

                                className=" rounded-full border p-1"
                            />
                        ) : (
                            <Ionicons name="person-circle" size={60} color="#D1D3D4" />
                        )
                        }
                        <View>
                            <Text className="text-lg font-semibold text-white">
                                {user?.firstName} {user?.lastName}
                            </Text>
                            <Text style={{ color: '#C2C2C2' }}>{user?.email}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* links */}
                    <View className="gap-2">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('home')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="home-sharp" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('notification')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="notifications" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Notification</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('offers')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="pricetags" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Offers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('address')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="location" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Address</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => navigation.navigate('referAFriend')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="person-add" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Refer a Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('support')}
                            className="h-12 w-full flex-row items-center  gap-3 rounded-lg px-3">
                            <Ionicons name="help-circle" size={24} color="#D1D3D4" />
                            <Text className="text-lg font-semibold text-white">Support</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            "Logout",
                            "Are you sure you want to logout?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "Logout",
                                    onPress: () => {
                                        AsyncStorage.removeItem('user');
                                        navigation.navigate('signIn');
                                    }
                                }
                            ]
                        );
                    }}
                    style={styles.elegantLogoutButton}
                >
                    <View

                        style={styles.gradientBackground}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#6759FF" />
                        <Text style={styles.elegantLogoutText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    elegantLogoutButton: {
        borderRadius: 25,
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
    },
    gradientBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    elegantLogoutText: {
        color: '#6759FF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
});
