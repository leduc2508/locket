import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { ThemeScreenStyle } from '../../assets/styles/ThemeScreen.Style';
import { useNavigation } from '@react-navigation/native';

export default function ThemeScreen() {
    const navigation = useNavigation();
    const images = [
        require('../../assets/images/image-widget1.jpg'),
        require('../../assets/images/image-widget2.jpg'),
        require('../../assets/images/image-widget3.jpg'),
        require('../../assets/images/image-widget4.jpg'),
        require('../../assets/images/image-widget5.jpg'),
        require('../../assets/images/image-widget6.jpg'),
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={ThemeScreenStyle.container}>
            <View style={ThemeScreenStyle.phoneSize}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    {/* Bigcell với ảnh tự động thay đổi */}
                    <View style={ThemeScreenStyle.bigcell}>
                        <Animated.Image
                            source={images[currentImage]}
                            style={{ width: '100%', height: '100%', borderRadius: 20, opacity: fadeAnim }}
                        />
                    </View>

                    {/* Smallcells bên cạnh bigcell */}
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>
                        {[0, 1].map((row) => (
                            <View
                                key={row}
                                style={{ flexDirection: 'row', marginBottom: 7 }} // tăng 15 để cách nhau
                            >
                                {[0, 1].map((_, idx) => (
                                    <View
                                        key={idx}
                                        style={[ThemeScreenStyle.smallcell, { padding: 10 }]}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>

                </View>

                {/* Hàng smallcells dưới */}
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        margin: 10,
                        marginLeft: 12,
                        justifyContent: 'space-between',
                    }}
                >
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <View key={idx} style={ThemeScreenStyle.smallcell} />
                    ))}
                </View>
                <View style={ThemeScreenStyle.rectangle}></View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/favicon.png')}
                    style={{ width: 45, height: 45 }}
                    resizeMode="cover"
                />
                <Text
                    style={[
                        ThemeScreenStyle.textBold,
                        { fontSize: 70, color: 'white', top: 9 }
                    ]}
                >
                    Locket
                </Text>
            </View>
            <Text style={[ThemeScreenStyle.textRegular, { textAlign: 'center', paddingHorizontal: 20 }]}>Ảnh trực tiếp từ bạn bè,ngay trên màn hình chính</Text>
            <View style={ThemeScreenStyle.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={[ThemeScreenStyle.textBold, { color: "#111" }]}>Tạo một tài khoản</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[ThemeScreenStyle.textBold]}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
