import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterStyle } from '../../assets/styles/RegisterScreen.Style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const FullnameScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const route = useRoute();
  const { email, phone, password } = route.params || {};
  const navigation = useNavigation();

  const handleContinue = () => {
    if (!surname.trim() || !name.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ họ và tên!");
      return;
    }

    navigation.navigate('Username', {
      email: email || null,
      phone: phone || null,
      password,
      surname: surname.trim(),
      name: name.trim()
    });
  };

  return (
    <SafeAreaView style={RegisterStyle.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={RegisterStyle.topSection}>
          <Text style={[RegisterStyle.textBold, { fontSize: 45, textAlign: 'center' }]}>
            Tên bạn là gì?
          </Text>

          {/* Nhập Họ */}
          <TextInput
            placeholder="Họ"
            placeholderTextColor="#aaa"
            style={[RegisterStyle.input, { fontSize: 30, marginTop: 20 }]}
            value={surname}
            onChangeText={setSurname}
          />

          {/* Nhập Tên */}
          <TextInput
            placeholder="Tên"
            placeholderTextColor="#aaa"
            style={[RegisterStyle.input, { fontSize: 30, marginTop: 10 }]}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={RegisterStyle.bottomSection}>
          <TouchableOpacity
            style={[RegisterStyle.button, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD700', minWidth: '90%' }]}
            onPress={handleContinue}
          >
            <Text style={[RegisterStyle.textBold, { marginRight: 8, color: '#111' }]}>
              Tiếp tục
            </Text>
            <Ionicons name="arrow-forward" size={24} color="#111" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FullnameScreen;
