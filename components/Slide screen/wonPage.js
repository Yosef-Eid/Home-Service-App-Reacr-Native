import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import SlideComponent from './slideComponent';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function WonPage({ navigation }) {
    useEffect(() => {

        const checkUser = async () => {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            navigation.replace('home');
          }
        };
        checkUser();
      }, []);
    
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <SlideComponent
                image={require('../../assets/img/won.png')}
                title={'Beauty parlour at your home'}
                description={' Lorem ipsum is a placeholder text commonly used to demonstrate the visual.'}
            />
            <TouchableOpacity title="Go to Details" className='w-[48px] h-[48px] rounded-full bg-[#6759FF] active:bg-purple-600 mt-8 items-center justify-center' onPress={() => navigation.navigate('towPage')} >
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
        </View>

    );
}
