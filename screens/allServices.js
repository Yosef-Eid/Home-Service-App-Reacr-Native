/* eslint-disable prettier/prettier */
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Search from 'components/search';
import { useState, useMemo } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

import { services } from '../data/servicesData';

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function AllServices() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  // Shuffle only once when the component mounts
  const shuffledServices = useMemo(() => shuffleArray(services), []);

  const filtered = shuffledServices.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <View className='w-full bg-white shadow-md p-4'>
        <Search search={search} setSearch={setSearch} />
      </View>

      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
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
                <View className='flex-row justify-between items-center'>
                  <Text className="text-base font-semibold">
                    {item.name.length > 13 ? item.name.slice(0, 13) + '...' : item.name}
                  </Text>
                  <Text className="text-sm text-[#6759FF]">${item.price}</Text>
                </View>

                <View className='flex-row items-center gap-2'>
                  <AntDesign name="star" size={16} color="#FFC554" />
                  <Text className="text-sm text-gray-500">{item.rating} ({item.reviews})</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
