import React, { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterStyle } from '../../assets/styles/RegisterScreen.Style';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiCheckUserName, apiRegister } from '../services/api';

const UsernameScreen = () => {
    const [username, setUsername] = useState('');
    const [notice, setNotice] = useState('');
    const [isError, setIsError] = useState(false);
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();
    const { email, phone, password, surname, name } = route.params || {};

    const checkUsername = (text) => /^[A-Za-z0-9_.]*$/.test(text);

    // Live validation + check username trên server
    useEffect(() => {
        if (!username) {
            setNotice('');
            setIsError(false);
            return;
        }

        if (!checkUsername(username)) {
            setNotice('Tên người dùng chỉ nhận các kí tự chữ cái, số, dấu _ và dấu .');
            setIsError(true);
            return;
        }

        if (username.length < 3) {
            setNotice('Tên người dùng ít nhất có 3 kí tự!');
            setIsError(true);
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                setChecking(true);
                const res = await apiCheckUserName(username);
                setChecking(false);
                if (res.exists) {
                    setNotice('Tên người dùng đã tồn tại!');
                    setIsError(true);
                } else {
                    setNotice('Có sẵn!');
                    setIsError(false);
                }
            } catch (error) {
                setChecking(false);
                setNotice('Lỗi kết nối, vui lòng thử lại!');
                setIsError(true);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [username]);

    // Xử lý nút Tiếp tục
    const handleContinue = async () => {
        console.log("🔹 handleContinue gọi");

        console.log({
            isError,
            username,
            checking,
            loading
        }); // xem điều kiện có chặn không

        if (isError || !username || checking || loading) {
            console.log("⚠️ Không gọi apiRegister do điều kiện chưa thỏa");
            return;
        }

        setLoading(true);
        const fullname = `${surname?.trim()} ${name?.trim()}`;
        console.log("🔹 Chuẩn bị gọi apiRegister", { email, phone, password, fullname, username });

        try {
            const res = await apiRegister({ email, phone, password, fullname, username });
            console.log("🔹 Kết quả apiRegister:", res);

            if (res.success) {
                console.log("✅ Đăng ký thành công, điều hướng Home");
                navigation.navigate('Home', { email, phone, password, fullname, username });
            } else {
                console.log("❌ Đăng ký thất bại:", res.message);
                setNotice(res.message || 'Đăng ký thất bại!');
                setIsError(true);
            }
        } catch (error) {
            console.log("❌ Lỗi khi gọi apiRegister:", error);
            setNotice('Lỗi kết nối, vui lòng thử lại!');
            setIsError(true);
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
                <View style={RegisterStyle.topSection}>
                    <Text style={[RegisterStyle.textBold, { fontSize: 45, textAlign: 'center' }]}>
                        Chọn một tên người dùng
                    </Text>

                    <TextInput
                        placeholder="Tên người dùng"
                        placeholderTextColor="#aaa"
                        style={[
                            RegisterStyle.input,
                            {
                                fontSize: 30,
                                marginTop: 20,
                                textAlign: 'center',
                                borderColor: username.length === 0 ? 'transparent' : (isError ? 'red' : '#FFD700'),
                                borderWidth: username.length === 0 ? 0 : 1,
                                paddingRight: 10,
                            },
                        ]}
                        value={username}
                        onChangeText={setUsername}
                    />

                    {notice !== '' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, minHeight: 24 }}>
                            <Ionicons
                                name={isError ? "close-circle" : "heart-circle-sharp"}
                                size={20}
                                color={isError ? "red" : "#FFD700"}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={{ color: isError ? 'red' : '#FFD700', fontSize: 20, fontFamily: 'Dongle-Regular', textAlign: 'center' }}>
                                {checking ? 'Đang kiểm tra...' : notice}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={RegisterStyle.bottomSection}>
                    <TouchableOpacity
                        style={[
                            RegisterStyle.button,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (isError || !username || checking || loading) ? '#ccc' : '#FFD700',
                                minWidth: '90%',
                            }
                        ]}
                        onPress={handleContinue}
                        disabled={isError || !username || checking || loading}
                    >
                        <Text style={[RegisterStyle.textBold, { marginRight: 8, color: '#111' }]}>
                            {loading ? 'Đang xử lý...' : 'Tiếp tục'}
                        </Text>
                        <Ionicons name="arrow-forward" size={24} color="#111" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default UsernameScreen;
