import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';

export default function GovernmentPoliciesScreen({ navigation }) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch('http://localhost:3000/policies');
        if (!response.ok) {
          throw new Error('Failed to fetch policies');
        }
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Government Policies for Sustainable Power Consumption</Text>
      {policies.map(policy => (
        <View key={policy.id} style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{policy.title}</Text>
          <Text style={{ fontSize: 16 }}>{policy.description}</Text>
        </View>
      ))}
      <Button title="Back to Input" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
