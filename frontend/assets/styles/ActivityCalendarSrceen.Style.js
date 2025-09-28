import { StyleSheet } from 'react-native';
export const ActivityCalendarStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2, 0, 0, 0.88)',
    },
    textRegular: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'Dongle-Regular',
    },
    taskBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        columnGap: 20,
    },

    header: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    textBold: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Dongle-Bold',
    },
    profile: {
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    borderAvatar: {
        borderColor: '#474646c7',
        width: 80,
        height: 80,
        borderWidth: 3,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#474646c7',
        width: 65,
        height: 65,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileBig: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20,
    },
    container2: {
        padding: 20,
        backgroundColor: "#111",
        flex: 1,
    },
    header: {
        color: "white",
        fontSize: 20,
        marginBottom: 15,
    },
    day: {
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    selectedDay: {
        backgroundColor: "#444",
        borderWidth: 2,
        borderColor: "orange",
    },
    dayText: {
        color: "white",
    },
    addButton: {
        marginTop: 20,
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    addText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});