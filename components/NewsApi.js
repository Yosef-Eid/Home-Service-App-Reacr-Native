// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   Button,
//   Linking
// } from 'react-native';

// const apikey = 'c456f66e745841a78acc99963889e9e3';
// const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;

// const NewsScreen = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setArticles(data.articles);
//         setLoading(false);
//       });
//   }, []);

//   const openModal = (article) => {
//     setSelectedArticle(article);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setSelectedArticle(null);
//     setModalVisible(false);
//   };
// ``
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       className="flex-row bg-blue-100 rounded-xl mb-3 p-1 overflow-hidden shadow-md"
//       onPress={() => openModal(item)}
//     >
//       <Image source={{ uri: item.image }} className="w-32 h-full rounded-xl" />
//       <View className="flex-1 p-3 justify-between">
//         <Text className="text-base font-semibold text-gray-800" numberOfLines={2}>
//           {item.title}
//         </Text>
//         <Text className="text-sm text-gray-600" numberOfLines={2}>
//           {item.description}
//         </Text>
//         <View className="flex-row justify-between mt-2">
//           <Text className="text-xs text-blue-700">{item.source.name}</Text>
//           <Text className="text-xs text-gray-500">
//             {new Date(item.publishedAt).toLocaleDateString()}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-white p-4">
//       {loading ? (
//         <ActivityIndicator size="large" color="#007aff" />
//       ) : (
//         <FlatList
//           data={articles}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderItem}
//         />
//       )}

//       {/* ✅ Modal Details */}
//       <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
//         {selectedArticle && (
//           <>
//             <Image
//               source={{ uri: selectedArticle.image }}
//               className="w-full h-52 mb-4"
//             />
//             <View className='p-3'>
//               <Text className="text-xl font-bold mb-2 text-gray-900">{selectedArticle.title}</Text>
//               <Text className="text-sm text-gray-500 mb-2">
//                 {new Date(selectedArticle.publishedAt).toLocaleString()}
//               </Text>
//               <Text className="text-base text-gray-800 mb-4">
//                 {selectedArticle.content || selectedArticle.description}
//               </Text>
//               <Text className="italic text-gray-500 mb-4">
//                 Source: {selectedArticle.source.name}
//               </Text>
//               <Button
//                 title="Open Full Article"
//                 onPress={() => Linking.openURL(selectedArticle.url)}
//               />
//               <View className="mt-4">
//                 <Button title="Close" color="red" onPress={closeModal} />
//               </View>
//             </View>
//           </>
//         )}
//       </Modal>
//     </View>
//   );
// };

// export default NewsScreen;
