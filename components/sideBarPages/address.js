/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useRef, useState } from 'react';
// import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Address = () => {
//   const webViewRef = useRef(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [mapCenter, setMapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // الرياض كموقع افتراضي

//   const mapHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="utf-8">
//         <title>OpenStreetMap</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//         <style>
//           body { margin:0; padding:0; }
//           #map { width:100%; height:100vh; }
//           .search-box {
//             position: absolute;
//             top: 10px;
//             left: 10px;
//             z-index: 1000;
//             background: white;
//             padding: 10px;
//             border-radius: 5px;
//             box-shadow: 0 0 10px rgba(0,0,0,0.2);
//           }
//         </style>
//       </head>
//       <body>
//         <div id="map"></div>
//         <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//         <script>
//           const map = L.map('map').setView([${mapCenter.lat}, ${mapCenter.lng}], 13);

//           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           }).addTo(map);

//           let marker = L.marker([${mapCenter.lat}, ${mapCenter.lng}]).addTo(map)
//             .bindPopup("الموقع الحالي");

//           function updateMap(lat, lng) {
//             map.setView([lat, lng], 13);
//             marker.setLatLng([lat, lng]).bindPopup("الموقع المحدد").openPopup();
//           }

//           // للتواصل مع React Native
//           window.updateMap = updateMap;
//         </script>
//       </body>
//     </html>
//   `;

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;

//     // استخدام Nominatim للبحث المجاني (لا يحتاج API Key)
//     fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });
//           webViewRef.current.injectJavaScript(`
//             window.updateMap(${lat}, ${lon});
//             true; // ضروري لـ Android
//           `);
//         }
//       })
//       .catch(error => console.error('Search error:', error));
//   };

//   return (
//     <View style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         originWhitelist={['*']}
//         source={{ html: mapHtml }}
//         style={styles.webview}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//       />

//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="ابحث عن موقع (مثال: الرياض، السعودية)"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.buttonText}>بحث</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
//   searchContainer: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     zIndex: 100,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 8,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   searchButton: {
//     backgroundColor: '#6759FF',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginLeft: 8,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Address;


import { AntDesign, Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Building from '@expo/vector-icons/FontAwesome5';
import InoIcon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Text, Animated, ImageBackground, View, Pressable, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';




export default function Address() {
  const navgtion = useNavigation();
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const mapRef = useRef(null);


  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission denied', 'Please enable location permissions');
        return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    setCurrentRegion(region);
    setSelectedLocation(region);

    if (mapRef.current) {
        mapRef.current.animateToRegion(region, 1000);
    }
};

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => navgtion.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentRegion}
        showsUserLocation
        onPress={(e) => {
          const { coordinate } = e.nativeEvent;
          setSelectedLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
          />
        )}
      </MapView>

      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
        >
          <Ionicons name="locate" size={20} color="#fff" />
          <Text style={styles.currentLocationText}>Current Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#6759FF',
    borderRadius: 8,
    marginTop: 10,
  },
  locationButtonText: {
    marginLeft: 10,
    color: '#6759FF',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6759FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  currentLocationText: {
    color: '#fff',
    marginLeft: 8,
    textAlign:'center'
  },
  confirmButton: {
    backgroundColor: '#6759FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});