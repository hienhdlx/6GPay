import {Dimensions, Platform, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get("screen");

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 35 : 0,
        backgroundColor: 'black'
    },
    textmoneyError: {
        color: '#ff0000',
        lineHeight: 22,
        marginTop: 10,
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: '400',
    },
    viewScroll: {
        width: width,
        height: '90%'
    },
    viewnote: {
        width: width * 0.9,
        height: Platform.OS === 'ios' ? height* 0.07 : height* 0.1,
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
        marginTop: height * 0.02 + 2,
        marginHorizontal: width / 20,
    },
    view1: {
        width: width * 0.9,
        height: height * 0.07,
        marginTop: height * 0.09,
        marginHorizontal: width / 20,
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
        flexDirection: 'row',
        justifyContent:'flex-start'
    },
    view2: {
        width: width * 0.1,
        height: height * 0.05,
        paddingVertical: width / 50,
    },
    view3: {
        width: width * 0.6,
        height: Platform.OS === 'ios' ? height* 0.06 : height* 0.07,
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
        marginTop: '10%',
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
    view8: {
        width: width * 0.7,
        height: height * 0.1,
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB'
    },
    view9: {
        width: width * 0.8,
        height: height * 0.05,
        justifyContent: 'flex-end'
    },
    viewbotton: {
        width: width * 0.8,
        height: height * 0.05,
        justifyContent: 'center'
    },
    view10: {
        width: width*0.9,
        height: height * 0.1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#CBCBCB',
    },
    view11: {
        width: width * 0.2,
        height: height * 0.1,
        paddingHorizontal: '3%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view12: {
        width: width * 0.7,
        height: height * 0.1,
        flexDirection: 'row'
    },
    view13: {
        width: width * 0.6,
        height: height * 0.1,
        justifyContent: 'center'
    },
    view14: {
        width: width * 0.1,
        height: height * 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    view15: {
        width: width,
        marginTop: "20%"
    },
    view21: {
        width: width * 0.9,
        height: height * 0.2,
        marginHorizontal: width / 20
    },
    view22: {
        width: width,
        height: height * 0.1,
        flexDirection: 'row'
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 24
    },
    textmonney: {
        color: '#FFFFFF',
        fontSize: 24,
        height: "100%",
    },
    text2: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: width/30,
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
    text5: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    text6: {
        color: '#FFFFFF',
        fontSize: 10,
    },
    text7: { fontSize: 20 },

});
