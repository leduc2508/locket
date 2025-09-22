import { StyleSheet } from 'react-native';
export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textRegular: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Dongle-Regular',
    },
    textBold: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Dongle-Bold',
    },
    camera: {
        flex: 1,
    },
    cameraFrame: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80%',
        height: '50%',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#fff',
        overflow: 'hidden',
    },
    innerFrame: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    captureButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
})