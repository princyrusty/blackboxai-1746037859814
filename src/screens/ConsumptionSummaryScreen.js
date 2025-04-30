import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function ConsumptionSummaryScreen({ route, navigation }) {
  const { calculationResult } = route.params;
  const { appliances, totalPowerConsumption, estimatedBill } = calculationResult;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Consumption Summary</Text>
      <FlatList
        data={appliances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.applianceName}: {item.consumption.toFixed(2)} kWh</Text>
          </View>
        )}
      />
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Total Power Consumption: {totalPowerConsumption.toFixed(2)} kWh
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Estimated Daily Bill: ${estimatedBill.toFixed(2)}
      </Text>
      <Button title="Back to Input" onPress={() => navigation.goBack()} />
    </View>
  );
}
