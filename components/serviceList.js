/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/core";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";

import { services } from '../data/servicesData';

export default function ServiceList() {
    const limitedServices = services.slice(0, 6).reverse();
    const navigation = useNavigation();

    return (
        <View>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-3">
                    <View className='w-1 h-4 bg-[#CABDFF]' />
                    <Text className='font-semibold text-2xl'>Services</Text>
                </View>
                <TouchableOpacity
                className=" border border-[#6F767E] rounded-full w-20 h-[30px] items-center justify-center"
                 onPress={() => navigation.navigate('allServices')}>
                    <Text style={{ color: '#6F767E' }}>See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 16,
                    flexDirection: 'row-reverse',
                }}
                data={limitedServices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className="items-center gap-2"
                        onPress={() =>
                            navigation.navigate('serviceDetails', {
                                service: item,
                            })
                        }>
                        <Image
                            width={140}
                            height={154}
                            className="w-[140px] h-[154px] rounded-xl"
                            source={item.img }
                            resizeMode="cover"
                        />
                        <Text className="text-base font-semibold">{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
