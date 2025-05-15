/* eslint-disable prettier/prettier */
// screens/SignUp.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function SignUp({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        password: false,
    });

    // const handleSignUp = async () => {
    //     const newErrors = {
    //         firstName: !firstName.trim(),
    //         lastName: !lastName.trim(),
    //         phone: !phone.trim(),
    //         email: !email.trim(),
    //         password: !password.trim(),
    //     };

    //     setErrors(newErrors);

    //     const hasErrors = Object.values(newErrors).some(error => error);
    //     if (!hasErrors) {
    //         const user = { firstName, lastName, phone, email, password };
    //         await AsyncStorage.setItem('user', JSON.stringify(user));
    //         navigation.replace('signIn');
    //     }
    // };

    const handleSignUp = async () => {
        const newErrors = {
            firstName: !firstName.trim(),
            lastName: !lastName.trim(),
            phone: !phone.trim(),
            email: !email.trim(),
            password: !password.trim(),
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            const user = {
                firstName,
                lastName,
                phone,
                email,
                password,
                avatar: null,
                gender: null,
                dob: null
            };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.replace('home');
        }
    };
    useEffect(() => {
        const checkUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) navigation.replace('home');
        };

        checkUser();
    }, []);

    return (
        <ScrollView className='w-full'>
            <View className='relative h-svh justify-center flex-1 items-center px-5 pt-16 pb-4'>
                <Image source={require('../../assets/img/Logo.png')} />

                <Text className='text-start w-full font-semibold text-4xl mb-6 mt-3'>Sign Up</Text>
                <View className='w-full items-center gap-5 '>

                    <View className='w-full flex gap-2'>
                        <Text className='font-semibold'>First Name</Text>
                        <TextInput
                            className={`bg-[#eeeeee] placeholder:text-[#b0b0b1] rounded-lg border ${errors.firstName ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                            placeholder="Enter First Name"
                            value={firstName}
                            onChangeText={(text) => {
                                setFirstName(text);
                                if (text.trim()) setErrors(prev => ({ ...prev, firstName: false }));
                            }}
                        />
                    </View>

                    <View className='w-full flex gap-2'>
                        <Text className='font-semibold'>Last Name</Text>
                        <TextInput
                            className={`placeholder:text-[#b0b0b1] bg-[#eeeeee] rounded-lg border ${errors.lastName ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChangeText={(text) => {
                                setLastName(text);
                                if (text.trim()) setErrors(prev => ({ ...prev, lastName: false }));
                            }}
                        />
                    </View>

                    <View className='w-full flex gap-2'>
                        <Text className='font-semibold'>Phone</Text>
                        <TextInput
                            className={`bg-[#eeeeee] placeholder:text-[#b0b0b1] rounded-lg border ${errors.phone ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                            keyboardType="phone-pad"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                if (text.trim()) setErrors(prev => ({ ...prev, phone: false }));
                            }}
                        />
                    </View>

                    <View className='w-full flex gap-2'>
                        <Text className='font-semibold'>Email</Text>
                        <TextInput
                            className={`bg-[#eeeeee] placeholder:text-[#b0b0b1] rounded-lg border ${errors.email ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                            keyboardType="email-address"
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (text.trim()) setErrors(prev => ({ ...prev, email: false }));
                            }}
                        />
                    </View>

                    <View className='w-full flex gap-2'>
                        <Text className='font-semibold'>Password</Text>
                        <TextInput
                            className={`bg-[#eeeeee] placeholder:text-[#b0b0b1] rounded-lg border ${errors.password ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                            secureTextEntry
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (text.trim()) setErrors(prev => ({ ...prev, password: false }));
                            }}
                        />
                    </View>
                </View>

                <View className='w-full px-6 items-center gap-4'>
                    <TouchableOpacity
                        className='w-full h-12 rounded-xl bg-[#6759FF] active:bg-purple-600 mt-8 items-center justify-center'
                        onPress={handleSignUp}
                    >
                        <Text className='text-white font-bold'>Sign Up</Text>
                    </TouchableOpacity>

                    <Text onPress={() => navigation.navigate('signIn')} className='text-[#9A9FA5] font-semibold'>
                        Already have an account? <Text className='text-[#6759FF]'>Sign In</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
