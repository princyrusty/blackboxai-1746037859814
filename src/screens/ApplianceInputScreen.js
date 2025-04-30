import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

export default function ApplianceInputScreen({ navigation }) {
  const [applianceName, setApplianceName] = useState('');
  const [powerRating, setPowerRating] = useState('');
  const [usageHours, setUsageHours] = useState('');
  const [appliances, setAppliances] = useState([]);

  const addAppliance = () => {
    if (applianceName && powerRating && usageHours) {
      setAppliances([...appliances, { id: Date.now().toString(), applianceName, powerRating: parseFloat(powerRating), usageHours: parseFloat(usageHours) }]);
      setApplianceName('');
      setPowerRating('');
      setUsageHours('');
    }
  };

  const calculateConsumption = async () => {
    if (appliances.length === 0) {
      Alert.alert('No appliances', 'Please add at least one appliance.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appliances }),
      });
      if (!response.ok) {
        throw new Error('Failed to calculate consumption');
      }
      const data = await response.json();
      navigation.navigate('ConsumptionSummary', { calculationResult: data });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Appliance Details</Text>
      <TextInput
        placeholder="Appliance Name"
        value={applianceName}
        onChangeText={setApplianceName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Power Rating (Watts)"
        value={powerRating}
        onChangeText={setPowerRating}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Usage Hours per Day"
        value={usageHours}
        onChangeText={setUsageHours}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Add Appliance" onPress={addAppliance} />
      <FlatList
        data={appliances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.applianceName} - {item.powerRating}W for {item.usageHours} hours</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
      <Button
        title="Calculate Consumption"
        onPress={calculateConsumption}
        style={{ marginTop: 20 }}
      />
      <Button
        title="View Government Policies"
        onPress={() => navigation.navigate('GovernmentPolicies')}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
