import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
    Image:{
        width: width / 21,
        height: width / 21,
    },
    TextFlatlist:{
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        marginLeft:15
    },
    TextLastWeek:{
        width: width / 4,

        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: width / 13,
        borderRadius: 10,
        borderColor: '#d2a61f',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    TextGold:{
        color: '#d2a61f',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
    },
    TextVND:{
        color: '#a5a5a5',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        textAlign:'center',
        width:width/11,
    },
    ViewVND:{
        flexDirection: 'row', borderRadius: 10,
        borderColor: '#d2a61f',
        borderStyle: 'solid',
        borderWidth: 1,
        width: width / 3,
        height: width / 13,
        alignItems: 'center',
    },
    TextInputVND:{
        color: '#a5a5a5',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        textAlignVertical: 'center',
        height: 40, width: '70%',
    },
    TextInputSearch:{
        height: 40,
        color:'#ffffff',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#a5a5a5',
        width:'93%'
    },
    ButtonResult:{
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#d2a61f',
        width:'100%',
        textAlign:'center',
        alignItems:'center',
        height:width/9,
        // marginBottom:20
        marginTop: width/ 4
    },
    TextResult:{
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '700',
    },
    ViewMoney:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));
