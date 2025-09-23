import { StyleSheet } from 'react-native';

export const ThemeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',

    },
    phoneSize: {
        width: 210,
        height: 400,
        borderWidth: 12,
        borderColor: '#474646c7',
        borderRadius: 60,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        backgroundColor: '#111',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    button: {
        backgroundColor: "#FFD700", 
        paddingVertical: 7,         
        paddingHorizontal: 20,      
        borderRadius: 30,           
        alignItems: "center",    
        marginTop: 30,
    },


    bigcell: {
        width: 80,
        height: 80,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        overflow: 'hidden',
        margin: 3,
    },
    smallcell: {
        width: 30,
        height: 30,
        borderRadius: 12,
        margin: 3,
        backgroundColor: '#333',
    },
    rectangle: {
        width: 150,
        height: 40,
        backgroundColor: "#474646c7",
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 90,
        marginLeft: 14,
    },
    image: {
        width: "100%",
        height: "100%",
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
});
