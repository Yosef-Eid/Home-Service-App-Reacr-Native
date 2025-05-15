/* eslint-disable prettier/prettier */
import { View } from 'react-native';

import { Nav } from './Nav';

export default function LayoutNavbar({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <Nav />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}
