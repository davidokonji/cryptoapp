import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Main from '../screens/Main';
import { TabOneParamList } from '../types';

const TabOneStack = createStackNavigator<TabOneParamList>();

export default function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Main"
        component={Main}
        options={{ headerTitle: 'Cryptocurrencies' }}
      />
    </TabOneStack.Navigator>
  );
}

