import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 35 : 0,
        backgroundColor: 'black'
    },
    viewScroll: {
        width: width,
        height: '90%'
    },
    viewButton: {
        width: width,
        height: "10%",
        marginBottom: 20
    },
    textinfoName: {
        color: '#d2a61f',
        marginTop: 20,
        fontSize: 17,
        fontWeight: '700',
        lineHeight: 19,
    },
    textinfophone: {
        color: '#a5a5a5',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 10,
    },
    textmoneyError: {
        color: '#ff0000',
        lineHeight: 22,
        marginTop: 10,
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: '400',
    },

    infor: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    viewnote: {
        width: width * 0.9,
        height: height* 0.07,
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
        marginTop: height * 0.02 + 2,
        marginHorizontal: width / 20,
    },
    view1: {
        width: width * 0.9,
        height: height * 0.08,
        marginHorizontal: width / 20,
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    view2: {
        width: width * 0.1,
        height: '100%',
        paddingVertical: Platform.OS === 'ios' ? width / 50 : width / 25,
        justifyContent:'center',
    },
    view3: {
        width: width * 0.6,
        height: "100%",
        justifyContent:'center',
    },
    view4: {
        width: width * 0.2,
        height: '100%',
        paddingVertical: width / 80,
        alignItems: 'flex-end',
        justifyContent:'center',
    },
    view5: {
        width: width * 0.9,
        height: height * 0.11 + 5,
        marginTop: '15%',
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
        marginHorizontal: width / 20,
        flexDirection:'row',
    },
    view6: {
        width: width * 0.45,
        height: height * 0.1,
        justifyContent:'space-between'
    },
    view7: {
        width: width * 0.05,
        height: height * 0.1,
        justifyContent: 'center'
    },
    view23: {
        width: width * 0.15,
        height: height * 0.1,
        justifyContent: 'center'
    },
    view15: {},
    view16: {
        width: width,
        height: height / 10,
        flexDirection: 'row',
        paddingHorizontal: width / 10,
        paddingVertical: height / 40,
    },
    view17: {
        height: height / 17,
        width: width / 3,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#cbcbcb',
        marginTop: 5,
        marginRight: width / 7,
    },
    view18: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    view20: {
        height: height / 17,
        width: width / 3,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#d2a61f',
        marginTop: 5,
    },
    view24: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    text2: {
        fontSize: 16,
        color: "#FFFFFF",
        marginTop: width/30,
        height:'100%'
    },
    text3: {
        color: '#a5a5a5',
        fontSize: 16,
        width: width * 0.6,
        marginBottom: height*0.01
    },
    text4: {
        color: '#a5a5a5',
        fontSize: 16,
        textAlign:"right",
        marginBottom: height*0.01
    },
    text6: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700'
    },
    text7: { fontSize: 20 },
});
