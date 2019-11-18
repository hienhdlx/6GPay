import {Dimensions, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
    viewButton: {
        width: width,
        height: "10%",
        marginBottom: 20
    },
    viewButtonsmall: {
        width: width,
        height: height / 10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    ViewTouch: {
        height: height / 14,
        width: width / 3,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#cbcbcb',
        marginTop: 5,
        marginRight: width / 15,
    },
    viewTouchsmall: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewButton2: {
        height: height / 14,
        width: width / 3,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#d2a61f',
        marginTop: 5,
    },
    text6: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700'
    },
});
