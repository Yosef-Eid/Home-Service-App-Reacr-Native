/* eslint-disable prettier/prettier */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, TextInput, View } from "react-native";




export default function Search({ search, setSearch, }) {

    const navigation = useNavigation();

    return (
        <View style={styles.searchInput}>
            <Ionicons name="arrow-back" size={20} color="gray" onPress={() => navigation.goBack()} />
            <TextInput
                className='w-full'
                placeholder="Search categories..."
                value={search}
                onChangeText={setSearch}
            />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        flex: 1,
        gap: 8
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        borderWidth: 1,
        padding: 7,
        borderRadius: 12,
        borderColor: '#ccc',
        // marginBottom: 20,
    },
});