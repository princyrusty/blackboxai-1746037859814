import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplianceInputScreen from './src/screens/ApplianceInputScreen';
import ConsumptionSummaryScreen from './src/screens/ConsumptionSummaryScreen';
import GovernmentPoliciesScreen from './src/screens/GovernmentPoliciesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ApplianceInput">
        <Stack.Screen name="ApplianceInput" component={ApplianceInputScreen} options={{ title: 'Appliance Input' }} />
        <Stack.Screen name="ConsumptionSummary" component={ConsumptionSummaryScreen} options={{ title: 'Consumption Summary' }} />
        <Stack.Screen name="GovernmentPolicies" component={GovernmentPoliciesScreen} options={{ title: 'Government Policies' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
