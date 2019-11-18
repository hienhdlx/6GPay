import {Dimensions, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
    viewButtonlogin:{
        width: width,
        height: height / 10,
        flexDirection: 'row',
        paddingHorizontal: width / 10,
        paddingVertical: height / 40,
    },
    touchopa1:{
        height: height / 15,
        width: width * 0.8,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#d2a61f',
        marginRight: width / 7,
    },
    TextLogin:{
        fontSize: 16,
        fontWeight: '700',
    },
});
