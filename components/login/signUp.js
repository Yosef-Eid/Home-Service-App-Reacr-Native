/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const handleSignUp = async () => {
    const newErrors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      phone: !phone.trim(),
      email: !email.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      const user = {
        firstName,
        lastName,
        phone,
        email,
        password,
        avatar: null,
        gender: null,
        dob: null,
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
    <SafeAreaView style={{flex:1,}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View className="relative flex-1 items-center justify-center px-5 pb-4 pt-16">
            <Image source={require('../../assets/img/Logo.png')} />

            <Text className="mb-6 mt-3 w-full text-start text-4xl font-semibold">Sign Up</Text>
            <View className="w-full items-center gap-5 ">
              <View className="flex w-full gap-2">
                <Text className="font-semibold">First Name</Text>
                <TextInput
                  className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.firstName ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                  placeholder="Enter First Name"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    if (text.trim()) setErrors((prev) => ({ ...prev, firstName: false }));
                  }}
                />
              </View>

              <View className="flex w-full gap-2">
                <Text className="font-semibold">Last Name</Text>
                <TextInput
                  className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.lastName ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    if (text.trim()) setErrors((prev) => ({ ...prev, lastName: false }));
                  }}
                />
              </View>

              <View className="flex w-full gap-2">
                <Text className="font-semibold">Phone</Text>
                <TextInput
                  className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.phone ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                  keyboardType="phone-pad"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (text.trim()) setErrors((prev) => ({ ...prev, phone: false }));
                  }}
                />
              </View>

              <View className="flex w-full gap-2">
                <Text className="font-semibold">Email</Text>
                <TextInput
                  className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.email ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                  keyboardType="email-address"
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (text.trim()) setErrors((prev) => ({ ...prev, email: false }));
                  }}
                />
              </View>

              <View className="flex w-full gap-2">
                <Text className="font-semibold">Password</Text>
                <TextInput
                  className={`rounded-lg border bg-[#eeeeee] placeholder:text-[#b0b0b1] ${errors.password ? 'border-red-400' : 'border-[#d5d5d5]'} px-1`}
                  secureTextEntry
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (text.trim()) setErrors((prev) => ({ ...prev, password: false }));
                  }}
                />
              </View>
            </View>

            <View className="w-full items-center gap-4 px-6">
              <TouchableOpacity
                className="mt-8 h-12 w-full items-center justify-center rounded-xl bg-[#6759FF] active:bg-purple-600"
                onPress={handleSignUp}>
                <Text className="font-bold text-white">Sign Up</Text>
              </TouchableOpacity>

              <Text
                onPress={() => navigation.navigate('signIn')}
                className="font-semibold text-[#9A9FA5]">
                Already have an account? <Text className="text-[#6759FF]">Sign In</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
