/* eslint-disable prettier/prettier */
import Search from 'components/search';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { categories } from '../data/servicesData';

export default function AllCategories({ navigation }) {
    const [search, setSearch] = useState('');

    const filtered = categories.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View className='flex-1 gap-2 bg-[#F9F9F9]'>
            <View className='w-full bg-white shadow-md p-4'>
                <Search search={search} setSearch={setSearch} />
            </View>

            <View className='p-4 flex-1'>
                <View className=' p-4 gap-4 bg-white flex-1 rounded-xl shadow-md '>
                    <Text className='font-semibold text-xl'>All Categories</Text>
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className='items-center justify-center'
                                onPress={() =>
                                    navigation.navigate('servicesScreen', {
                                        categoryId: item.name,
                                        categoryName: item.name,
                                    })
                                }
                            >
                                <View className='rounded-full flex items-center justify-center' style={{ width: 72, height: 72, backgroundColor: item.color }}>
                                    <Image source={item.img} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                                <Text className='text-center '>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

