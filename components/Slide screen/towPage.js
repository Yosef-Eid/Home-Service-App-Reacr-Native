import { View, Text, TouchableOpacity } from 'react-native';
import SlideComponent from './slideComponent';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
export default function TowPage({navigation}) {
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
                image={require('../../assets/img/tow.png')}
                title={' Plumber & expart nearby youe'}
                description={'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form and layout of a document or visual presentation.'}
            />
            <TouchableOpacity title="Go to Details" className='w-[48px] h-[48px] rounded-full bg-[#6759FF] active:bg-purple-600 mt-8 items-center justify-center' onPress={() => navigation.navigate('ThreePage')} >
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}
