/* eslint-disable prettier/prettier */
import { View } from 'react-native';

import CategoriesList from './categoriesList';
import LayoutNavbar from './layoutNavBar';
import ServiceList from './serviceList';
import OffersHome from './offersHome';

export default function Home() {
  return (
    <LayoutNavbar>
      <View className='flex-1 gap-4 p-4 bg-[#F9F9F9]'>
        <CategoriesList />
        <ServiceList />
        <OffersHome />
      </View>
    </LayoutNavbar>
  );
}
