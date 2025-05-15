/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import './global.css';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WonPage from 'components/Slide screen/wonPage';
import TowPage from 'components/Slide screen/towPage';
import ThreePage from 'components/Slide screen/threePage';
import SignIn from 'components/login/signIn';
import SignUp from 'components/login/signUp';
import Home from 'components/home';
import CustomDrawerContent from 'components/sideBar';
import Profile from 'components/profile';
import Address from 'components/sideBarPages/address';
import ReferAFriend from 'components/sideBarPages/referAFriend';
import AllServices from 'screens/allServices';
import AllCategories from 'screens/allCategories';
import ServicesScreen from 'screens/servicesScreen';
import ServiceDetails from 'screens/serviceDetails';
import Notification from 'screens/notification';
import Support from 'screens/sideBarScreens/support';
import Offers from 'screens/sideBarScreens/offers';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        swipeEdgeWidth: 200,
        drawerStyle: {
          width: 300,
          backgroundColor: '#6759FF'
        }
      }}
    >
      {/* sideBar Pages */}
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="address" component={Address} />
      <Drawer.Screen name="offers" component={Offers} />
      <Drawer.Screen name="referAFriend" component={ReferAFriend} />
      <Drawer.Screen name="support" component={Support} />
      <Drawer.Screen name="notification" component={Notification} />

    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='wonPage'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="wonPage" component={WonPage} />
          <Stack.Screen name="towPage" component={TowPage} />
          <Stack.Screen name="ThreePage" component={ThreePage} />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="allServices" component={AllServices} />
          <Stack.Screen name="allCategories" component={AllCategories} />
          <Stack.Screen name="servicesScreen" component={ServicesScreen} />
          <Stack.Screen name="serviceDetails" component={ServiceDetails} options={{
            presentation: 'modal',
            gestureEnabled: true,
          }} />
          <Stack.Screen name="notification" component={Notification} />


          <Stack.Screen name="home" component={MainDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
