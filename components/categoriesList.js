/* eslint-disable prettier/prettier */


import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/core";
import { categories } from "data/servicesData";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesList() {
    const navigation = useNavigation();

    const limitedCategories = categories.slice(0, 3);

    const dataWithSeeAll = [
        ...limitedCategories,
        { id: 'seeAll', name: 'See All', isSeeAll: true },
    ];

    return (
        <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text className='font-semibold text-2xl'>Categories</Text>
            </View>

            <View className='bg-white p-3 rounded-xl shadow-md'>

                <FlatList
                    data={dataWithSeeAll}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                    renderItem={({ item }) => {

                        if (item.isSeeAll) {
                            return (
                                <TouchableOpacity
                                    className='items-center justify-center gap-3'
                                    onPress={() => navigation.navigate('allCategories')}
                                >
                                    <View className='w-[72px] h-[72px] rounded-full border border-[#ECECEC] bg-[#FAFAFA] items-center justify-center'>
                                        <AntDesign name="arrowright" size={24} color="black" />
                                    </View>
                                    <Text>See All</Text>
                                </TouchableOpacity>
                            );
                        }

                        return (
                            <TouchableOpacity
                                key={item.id}
                                className='items-center justify-center gap-3'
                                onPress={() => navigation.navigate('servicesScreen', {
                                    categoryId: item.name,
                                    categoryName: item.name,
                                })}
                            >
                                <View style={{ backgroundColor: item.color }} className='w-[72px] h-[72px] rounded-full items-center justify-center'>
                                    <Image source={item.img} />
                                </View>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

        </View>
    );
}
