/* eslint-disable prettier/prettier */
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity, View } from 'react-native'

export const Nav = () => {
    const navigation = useNavigation();
    return (
        <View >
            <View style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderColor: '#E5E5E5', borderWidth: 1 }} className='w-full h-16 bg-white  flex-row px-5  items-center justify-between'>

                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Ionicons name="home" size={24} color="#6F767E" />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('offers')}>
                    <Ionicons name="pricetags" size={24} color="#6F767E" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('notification')}>
                    <Ionicons name="notifications" size={24} color="#6F767E" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={24} color="#6F767E" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

