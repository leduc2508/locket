import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { HomeScreenStyle } from '../../assets/styles/HomeScreen.Style';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [displayZoom, setDisplayZoom] = useState(1);
  const count = 0;
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const pinchStartZoom = useRef(0);
  const [type, setType] = useState('front');
  const [flashMode, setFlashMode] = useState('off');
  const maxDisplayZoom = 6;
  const route = useRoute();
  const user = route.params;
  const { email, phone, username, fullname } = user || {};

  //Xử lý avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0] || '')
      .join('')
      .toUpperCase();
  };
  // Xin quyền sử dụng thư viện ảnh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // Xin quyền sử dụng camera
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  // Lưu giá trị zoom khi bắt đầu pinch
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      pinchStartZoom.current = displayZoom;
    })
    .onUpdate((e) => {
      let newDisplayZoom = pinchStartZoom.current * e.scale;

      if (newDisplayZoom < 1) newDisplayZoom = 1;
      if (newDisplayZoom > maxDisplayZoom) newDisplayZoom = maxDisplayZoom;

      setDisplayZoom(newDisplayZoom);
    });

  if (!permission || !permission.granted) {
    return <Text style={{ flex: 1, textAlign: "center", marginTop: 100 }}>Đang xin quyền camera...</Text>;
  }
  return (
    <View style={HomeScreenStyle.container}>
      {/* Thanh header của Home */}
      <View style={HomeScreenStyle.header}>
        <View style={[HomeScreenStyle.headerCenter, { width: 45, height: 45 }]}>
          <TouchableOpacity
            onPress={() => alert("Profile")}
          >
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={HomeScreenStyle.headerCenter}>
          <TouchableOpacity
            onPress={() => alert("Friends")}
          >
            {count === 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <FontAwesome6 name="user-group" size={15} color="white" />
                <Text style={[HomeScreenStyle.textBold, { marginLeft: 5, fontSize: 27 }]}>
                  Thêm một người bạn
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <FontAwesome6 name="user-group" size={15} color="white" />
                <Text style={[HomeScreenStyle.textBold, { marginLeft: 5, fontSize: 27 }]}>
                  {count} người bạn
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={[HomeScreenStyle.headerCenter, { width: 45, height: 45 }]}>
          <TouchableOpacity
            onPress={() => alert("Message")}
          >
            <Feather name="message-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hiển thị camera */}
      <GestureDetector gesture={pinchGesture}>
        <CameraView
          style={HomeScreenStyle.camera}
          ref={cameraRef}
          zoom={(displayZoom - 1) / (maxDisplayZoom - 1)}
          facing={type}
          flash={flashMode}
        />
      </GestureDetector>
      <View style={HomeScreenStyle.checkValueRoom}>
        <Text style={[HomeScreenStyle.textRegular, { fontSize: 20 }]}>
          {parseFloat(displayZoom.toFixed(1))}x
        </Text>
      </View>
      <View style={HomeScreenStyle.flashMode}>
        <TouchableOpacity
          onPress={() => {
            if (flashMode === 'off') setFlashMode('on');
            else setFlashMode('off');
          }}
        >
          {flashMode === 'off' && <Ionicons name="flash" size={20} color="white" />}
          {flashMode === 'on' && <Ionicons name="flash" size={20} color="gold" />}
        </TouchableOpacity>
      </View>

      {/* Button */}
      <View style={HomeScreenStyle.areaButton}>
        {/* Upload từ thư viện ảnh*/}
        <TouchableOpacity
          onPress={pickImage}
        >
          <Ionicons name="albums" size={40} color="white" />
        </TouchableOpacity>

        {/* Chụp ảnh */}
        <TouchableOpacity
          onPress={async () => {
            if (cameraRef.current) {
              const photo = await cameraRef.current.takePictureAsync();
              console.log('Photo taken:', photo.uri);
            }
          }}
        >
          <View style={HomeScreenStyle.outsiteButtonCamera}>
            <View style={HomeScreenStyle.insiteButtonCamera} />
          </View>
        </TouchableOpacity>

        {/* Đổi cam trước sau */}
        <TouchableOpacity
          onPress={() => {
            setType((prevType) => (prevType === 'front' ? 'back' : 'front'))
          }}
        >
          <FontAwesome name="refresh" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View>
      </View>
      <View style={HomeScreenStyle.footer}>
        <TouchableOpacity
          style={[HomeScreenStyle.nextButton]}
          onPress={() => alert('Next')}
        >
          {/* Hàng icon + text */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <View style={HomeScreenStyle.borderPicture}>
              <Entypo name="images" size={20} color="white" style={{ marginRight: 4 }} />
            </View>
            <Text style={[HomeScreenStyle.textBold, {fontSize: 35}]}>Lịch sử</Text>
          </View>
          {/* Mũi tên dưới */}
          <FontAwesome6 name="chevron-down" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default HomeScreen;

