/* eslint-disable prettier/prettier */
import { ScrollView, View } from 'react-native';

import CategoriesList from './categoriesList';
import LayoutNavbar from './layoutNavBar';
import ServiceList from './serviceList';
import OffersHome from './offersHome';
import Files from 'screens/sideBarScreens/offers';
import HomeServicesOffer from './homeServicesOffer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1  , backgroundColor: '#000'}}>
    <LayoutNavbar>
      <ScrollView className='flex-1 gap-4 p-4 bg-[#F9F9F9]'>
        <View style={{ flex: 1, gap: 22 }}>
          <CategoriesList />
          <ServiceList />
          <OffersHome />
          <HomeServicesOffer />
    </View>
      </ScrollView>
    </LayoutNavbar >
    </SafeAreaView>
  );
}
