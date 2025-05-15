/* eslint-disable prettier/prettier */
import { AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Search from 'components/search';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { services } from '../data/servicesData';

export default function ServicesScreen({ route }) {
    const navigation = useNavigation();

    const { categoryId } = route.params;
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const filteredServices = services.filter(
            (item) =>
                item.categoryId === categoryId && item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(filteredServices);
    }, [search, categoryId]);

    return (
        <View className="gap-4 p-4">

            <Search search={search} setSearch={setSearch} />
            
            <FlatList
                data={filtered}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingTop: 16,

                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-white rounded-xl overflow-hidden shadow-md"
                        style={{ width: '48%' }}
                        onPress={() =>
                            navigation.navigate('serviceDetails', {
                                service: item,
                            })
                        }
                    >
                        <Image
                            className="w-full h-[154px]"
                            source={item.img}
                            resizeMode="cover"
                        />

                        <View style={{ gap: 5 }} className="p-3">

                            <View className='flex-row justify-between items-center '>
                                <Text className="text-base font-semibold">{item.name.length > 13 ? item.name.slice(0, 13) + '...' : item.name}</Text>
                                <Text className="text-sm text-[#6759FF]">${item.price}</Text>
                            </View>

                            <View className='flex-row items-center gap-2'>
                                <AntDesign name="star" size={16} color="#FFC554" />
                                <Text className="text-sm text-gray-500">{item.rating} ({item.reviews})</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 30, color: 'gray' }}>
                        No services found
                    </Text>
                }
            />
        </View >
    );
}