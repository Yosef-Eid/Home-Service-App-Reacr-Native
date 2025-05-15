import { View, Text, Image } from 'react-native';

export default function SlideComponent({ image, title, description}) {

    return (
        <View className='items-center'>
            <Image source={image}  />
            <View className='text-center items-center gap-3'>
                <Text className='w-[190px] text-center text-[#1A1D1F] text-2xl font-bold'>{title}</Text>
                <Text className='w-[290] text-center text-[#535763] text-sm'> {description}</Text>
            </View>
        </View>
    );
}
