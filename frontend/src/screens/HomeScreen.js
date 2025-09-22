import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenStyle } from '../../assets/styles/HomeScreen.Style';
import { launchCamera } from 'react-native-image-picker';
import { useState, useEffect } from 'react';

const HomeScreen = () => {
    const [photo, setPhoto] = useState('');

    const camera = () => {
        launchCamera(
            {
                mediaType: 'mixed',
                cameraType: 'front',
                saveToPhotos: true,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.errorCode) {
                    console.log('Camera error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0].uri;
                    setPhoto(uri);
                }
            }
        );
    };
    useEffect(() => {
        camera();
    }, []);

    return (
        <SafeAreaView style={HomeScreenStyle.container}>
            {photo ? (
                <Image
                    source={{ uri: photo }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
            ) : (
                <Text>Đang mở camera...</Text>
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;
