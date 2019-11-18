import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
    ViewAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4,
        marginTop: width / 10
    },
    TextName: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22,
    },
    TextGold: {
        marginLeft: width / 10 - 5,
        color: '#d2a61f',
        // fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    ViewMail: {
        flexDirection: 'row',
        marginLeft: width / 10,
        marginTop: width / 14,
        alignItems:'center'
    },
    TextMail: {
        marginLeft: width / 10,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    ViewLine: {
        borderColor: '#cbcbcb',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        marginLeft: width / 4 + 15,
        marginRight: 15,
        marginTop: 15,
    },
    ViewCheck:{
        flex: 2,
        alignItems: 'flex-end'
    },
    ViewPhone: {
        flexDirection: 'row',
        marginLeft: width / 10 + 5,
        marginTop: 15,
        alignItems: 'center',
    },
    TextPhone: {
        marginLeft: width / 10 + 5,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    ViewBank: {
        backgroundColor: '#ffffff',
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: width / 12,
    },
    TextBank: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        marginLeft: '10%',
    },
    TextBankNumber: {
        height: 28,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    ViewButton: {
        backgroundColor: '#ffffff',
        marginHorizontal: width / 11,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        height: height / 10,
        marginBottom: 10
    },
    TextButton: {
        height: 28,
        marginLeft: 10,
        color: '#d2a61f',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    ViewTopUp: {
        backgroundColor: '#d2a61f',
        marginHorizontal: width / 11,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderRadius: 5,
    },
    ImageCheck: {
        width: width / 20,
        height: width / 20,
        marginRight: 10,
    },
    ImageAdd: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    ImageAvatar: {
        width: height/8,
        height: height/8,
        backgroundColor: '#ffffff',
        borderRadius: 100
    },
    TextTopUp:{
        marginLeft: width / 10 - 5,
        color: '#d2a61f',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        marginTop: width / 14
    },
    ImageVPBank:{
        width: 46,
        height: 43,
        resizeMode: "contain"
    },
    ImageMail:{
        width: height/21-5,
        height:height/21-10
    },
    ImagePhone:{
        width: width/17,
        height: height/21,
    },
    TextAdd:{
        color: '#000000',
        // fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    }

});
