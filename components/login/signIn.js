/* eslint-disable prettier/prettier */
// screens/SignIn.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function SignIn({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    identifier: false,
    password: false,
  });

  const handleSignIn = async () => {
    const newErrors = {
      identifier: !identifier.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const isValid =
        (identifier === user.email || identifier === user.phone) && password === user.password;

      if (isValid) {
        navigation.replace('home');
      } else {
        alert('Invalid email/phone or password');
      }
    } else {
      alert('No user found. Please sign up first.');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        navigation.replace('Main');
      }
    };

    checkUser();
  }, []);

  return (
    <ScrollView className="w-full">
      <View className="relative h-svh flex-1 items-center justify-center px-5 pb-4 pt-16">
        <Image source={require('../../assets/img/Logo.png')} />

        <Text className="mb-6 mt-3 w-full text-start text-4xl font-semibold">Sign In</Text>

        <View className="w-full items-center gap-5">
          <View className="flex w-full gap-2">
            <Text className="font-semibold">Email or Phone</Text>
            <TextInput
              className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.identifier ? 'border-red-500' : 'border-[#d5d5d5]'} px-1`}
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                if (text.trim()) setErrors((prev) => ({ ...prev, identifier: false }));
              }}
              placeholder="Enter your email or phone"
            />
          </View>

          <View className="flex w-full gap-2">
            <Text className="font-semibold">Password</Text>
            <TextInput
              className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.password ? 'border-red-500' : 'border-[#d5d5d5]'} px-1`}
              value={password}
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
                if (text.trim()) setErrors((prev) => ({ ...prev, password: false }));
              }}
              placeholder="Enter your password"
            />
          </View>
        </View>

        <View className="w-full items-center gap-4 px-6">
          <TouchableOpacity
            className="mt-8 h-12 w-full items-center justify-center rounded-xl bg-[#6759FF] active:bg-purple-600"
            onPress={handleSignIn}>
            <Text className="font-bold text-white">Sign In</Text>
          </TouchableOpacity>

          <Text
            onPress={() => navigation.navigate('signUp')}
            className="font-semibold text-[#9A9FA5]">
            Don't have an account? <Text className="text-[#6759FF]">Sign Up</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
