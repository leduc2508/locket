import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Linking,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterStyle } from '../../assets/styles/RegisterScreen.Style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { apiLogin } from '../services/api';

const PasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { email, phone, mode } = route.params || {};

    const validatePassword = (text) => text.length >= 8;

    const handleContinue = async () => {
        if (!validatePassword(password)) {
            setIsValid(false);
            return;
        }
        setLoading(true);

        try {
            if (mode === "register") {
                // → Đi tiếp sang nhập họ tên
                navigation.navigate('Fullname', {
                    email: email || null,
                    phone: phone || null,
                    password,
                    mode
                });
            } else if (mode === "login") {
                // → Gọi API đăng nhập
                const res = await apiLogin({ email, phone, password });
                if (res.success) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home', params: res.user }],
                    });
                } else {
                    Alert.alert("Thông báo", "Tài khoản mật khẩu không chính xác, Vui lòng thử lại!");
                }
            } else {
                Alert.alert("Thông báo", "Không xác định được chế độ đăng nhập/đăng ký!");
            }
        } catch (error) {
            Alert.alert("Lỗi kết nối", error.message);
        } finally {
            setLoading(false);
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
                        Nhập mật khẩu
                    </Text>

                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor="#aaa"
                            style={[
                                RegisterStyle.input,
                                { fontSize: 30, width: '100%' },
                            ]}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setIsValid(validatePassword(text));
                            }}
                        />
                    </View>
                </View>

                {/* Phần chính sách + nút */}
                <View style={RegisterStyle.bottomSection}>
                    {mode === "register" && (
                        <Text
                            style={[
                                RegisterStyle.textRegular,
                                {
                                    fontSize: 16,
                                    textAlign: 'center',
                                    paddingHorizontal: 15,
                                    color: '#ffffff58',
                                    marginBottom: 20,
                                },
                            ]}
                        >
                            Thông qua việc chạm nút Tiếp tục, bạn đồng ý với các{' '}
                            <Text
                                style={[RegisterStyle.textBold, { fontSize: 16, color: '#ffffffae' }]}
                                onPress={() => Linking.openURL('https://locket.camera/terms')}
                            >
                                Điều khoản dịch vụ
                            </Text>
                            <Text> và </Text>
                            <Text
                                style={[RegisterStyle.textBold, { fontSize: 16, color: '#ffffffae' }]}
                                onPress={() => Linking.openURL('https://locket.camera/privacy')}
                            >
                                Chính sách bảo mật
                            </Text>
                            <Text> của chúng tôi</Text>
                        </Text>
                    )}

                    <TouchableOpacity
                        disabled={!isValid || loading}
                        style={[
                            RegisterStyle.button,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isValid ? '#FFD700' : '#5d5d5d',
                                minWidth: '90%',
                                opacity: loading ? 0.6 : 1,
                            },
                        ]}
                        onPress={handleContinue}
                    >
                        <Text
                            style={[
                                RegisterStyle.textBold,
                                { marginRight: 8, color: isValid ? '#111' : '#aaa' },
                            ]}
                        >
                            {loading ? "Đang xử lý..." : "Tiếp tục"}
                        </Text>
                        <Ionicons name="arrow-forward" size={24} color={isValid ? '#111' : '#aaa'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PasswordScreen;
