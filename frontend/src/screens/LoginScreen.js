import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import { RegisterStyle } from '../../assets/styles/RegisterScreen.Style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiCheckEmail, apiCheckPhone } from '../services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const phoneInput = useRef(null);
  const navigation = useNavigation();

  // regex check email
  const validateEmailFormat = (text) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(text);
  };

  const handleContinue = async () => {
    if (useEmail) {
      if (!validateEmailFormat(email)) {
        setIsValid(false);
        return;
      }
      const res = await apiCheckEmail(email);
      if (!res.exists) {
        Alert.alert(
          "không tìm thấy tài khoản",
          "Nếu bạn chưa tạo tài khoản, hãy thử đăng ký!",
          [
            { text: "Đăng ký", onPress: () => navigation.navigate("Register") },
            { text: "OK", style: "cancel" },
          ]
        );
        return;
      }

      navigation.navigate('Password', { email, phone: null , mode: "login"});
    } else {
      const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
      if (!checkValid) {
        setIsValid(false);
        return;
      }
      const res = await apiCheckPhone(phoneNumber);
      if (!res.exists) {
        Alert.alert(
          "Không tìm thấy tài khoản",
          "Nếu bạn chưa tạo tài khoản, hãy thử đăng ký!",
          [
            { text: "Đăng ký", onPress: () => navigation.navigate("Register") },
            { text: "OK", style: "cancel" },
          ]
        );
        return;
      }

      navigation.navigate('Password', { email: null, phone: phoneNumber , mode: "login"});
    }
  };

  return (
    <SafeAreaView style={RegisterStyle.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        {/* Phần nhập */}
        <View style={RegisterStyle.topSection}>
          <Text style={[RegisterStyle.textBold, { fontSize: 40, textAlign: 'center' }]}>
            {useEmail ? "Nhập email" : "Nhập số điện thoại"}
          </Text>

          {useEmail ? (
            <TextInput
              placeholder="Địa chỉ email"
              placeholderTextColor="#aaa"
              style={[RegisterStyle.input, { fontSize: 30, paddingHorizontal: 30, marginTop: 20 }]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsValid(validateEmailFormat(text));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="VN"
              layout="second"
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
                const valid = phoneInput.current?.isValidNumber(text);
                setIsValid(valid);
              }}
              containerStyle={{
                width: '90%',
                borderRadius: 40,
                backgroundColor: '#333',
                marginTop: 20,
              }}
              textContainerStyle={{
                backgroundColor: '#222',
                borderRadius: 40,
                paddingVertical: 12,
              }}
              textInputStyle={{
                color: '#fff',
                fontSize: 30,
                fontFamily: 'Dongle-Regular',
                paddingLeft: 10,
              }}
              codeTextStyle={{
                color: '#fff',
                fontSize: 30,
                fontFamily: 'Dongle-Regular',
              }}
            />
          )}

          <TouchableOpacity
            style={[RegisterStyle.button, {
              marginTop: 20,
              backgroundColor: '#3c3c3c6f',
              minWidth: '70%',
            }]}
            onPress={() => {
              setUseEmail(!useEmail);
              setEmail('');
              setPhoneNumber('');
              setIsValid(false)
            }}
          >
            <Text style={[RegisterStyle.textBold, { fontSize: 23, textAlign: 'center', color: "#fff" }]}>
              {useEmail ? "Sử dụng số điện thoại thay cho cách này" : "Sử dụng email thay thế cho cách này"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phần chính sách + nút */}
        <View style={RegisterStyle.bottomSection}>
          <Text style={[RegisterStyle.textRegular, { fontSize: 16, textAlign: 'center', paddingHorizontal: 15, color: '#ffffff58', marginBottom: 20 }]}>
            Thông qua việc chạm nút Tiếp tục, bạn đồng ý với các{' '}
            <Text
              style={[RegisterStyle.textBold, { fontSize: 16, color: '#ffffffae' }]}
              onPress={() => Linking.openURL('https://locket.camera/terms')}
            >Điều khoản dịch vụ</Text>
            <Text> và </Text>
            <Text
              style={[RegisterStyle.textBold, { fontSize: 16, color: '#ffffffae' }]}
              onPress={() => Linking.openURL('https://locket.camera/privacy')}
            >Chính sách bảo mật</Text>
            <Text> của chúng tôi</Text>
          </Text>

          <TouchableOpacity
            disabled={!isValid}
            style={[RegisterStyle.button, {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isValid ? '#FFD700' : '#5d5d5d',
              minWidth: '90%',
            }]}
            onPress={handleContinue}
          >
            <Text style={[RegisterStyle.textBold, { marginRight: 8, color: isValid ? '#111' : '#aaa' }]}>
              Tiếp tục
            </Text>
            <Ionicons name="arrow-forward" size={24} color={isValid ? '#111' : '#aaa'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
