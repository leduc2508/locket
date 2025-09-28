import React, { useState, useEffect, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { HomeScreenStyle } from '../../assets/styles/HomeScreen.Style';
import { Ionicons, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [displayZoom, setDisplayZoom] = useState(1);
  const cameraRef = useRef(null);
  const pinchStartZoom = useRef(0);
  const [type, setType] = useState('front');
  const [flashMode, setFlashMode] = useState('off');
  const maxDisplayZoom = 6;
  const navigation = useNavigation();

  const route = useRoute();
  const { direction, ...user } = route.params || {}; // ✅ tách direction
  const { email, phone, username, fullname, createdAt } = user || {};

  const count = 1;
  // Xin quyền camera
  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  // Xin quyền thư viện ảnh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Pinch zoom
  const pinchGesture = Gesture.Pinch()
    .onStart(() => { pinchStartZoom.current = displayZoom; })
    .onUpdate((e) => {
      let newZoom = pinchStartZoom.current * e.scale;
      if (newZoom < 1) newZoom = 1;
      if (newZoom > maxDisplayZoom) newZoom = maxDisplayZoom;
      setDisplayZoom(newZoom);
    });

  if (!permission || !permission.granted) {
    return <Text style={{ flex: 1, textAlign: "center", marginTop: 100 }}>Đang xin quyền camera...</Text>;
  }

  return (
    <View style={HomeScreenStyle.container}>
      {/* Header */}
      <View style={HomeScreenStyle.header}>
        {/* Avatar chuyển ActivityCalendar */}
        <View style={[HomeScreenStyle.headerCenter, { width: 45, height: 45 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ActivityCalendar', { ...user, direction: 'left' })} // ✅ truyền direction
          >
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Thông tin bạn bè */}
        <View style={HomeScreenStyle.headerCenter}>
          <TouchableOpacity onPress={() => alert("Friends")}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
              <Ionicons name="people" size={25} color="white" />
              <Text style={[HomeScreenStyle.textBold, { marginLeft: 5, fontSize: 27 }]}>
                {count === 0 ? 'Thêm một người bạn' : `Có ${count} người bạn`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Message */}
        <View style={[HomeScreenStyle.headerCenter, { width: 45, height: 45 }]}>
          <TouchableOpacity onPress={() => alert("Message")}>
            <Feather name="message-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera */}
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
          {displayZoom.toFixed(1)}x
        </Text>
      </View>

      {/* Flash */}
      <View style={HomeScreenStyle.flashMode}>
        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === 'off' ? 'on' : 'off')}
        >
          <Ionicons name="flash" size={20} color={flashMode === 'on' ? 'gold' : 'white'} />
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={HomeScreenStyle.areaButton}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="albums" size={40} color="white" />
        </TouchableOpacity>

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

        <TouchableOpacity
          onPress={() => setType(prev => (prev === 'front' ? 'back' : 'front'))}
        >
          <FontAwesome name="refresh" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={HomeScreenStyle.footer}>
        <TouchableOpacity style={[HomeScreenStyle.nextButton]} onPress={() => alert('Next')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <View style={HomeScreenStyle.borderPicture}>
              <Entypo name="images" size={20} color="white" style={{ marginRight: 4 }} />
            </View>
            <Text style={[HomeScreenStyle.textBold, { fontSize: 35 }]}>Lịch sử</Text>
          </View>
          <FontAwesome6 name="chevron-down" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
