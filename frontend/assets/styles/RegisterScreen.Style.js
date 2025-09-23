import { StyleSheet } from 'react-native';

export const RegisterStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    topSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 30,
    },
    bottomSection: {
        padding: 20,
        paddingBottom: 10,
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
    textLight: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Dongle-Light',
    },
    input: {
        width: '90%',
        backgroundColor: '#474646c7',
        borderRadius: 30,
        paddingLeft: 20,
        paddingVertical: 10,
        fontSize: 25,
        color: '#fff',
        fontFamily: 'Dongle-Regular',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        minWidth: '90%',
    }
});
