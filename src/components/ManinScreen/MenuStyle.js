import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        flex: 8,
        flexDirection: 'row'
    },
    ViewLogo:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ViewHoSo:{
        flex: 2.5,
        borderTopRightRadius: 50,
        borderColor: '#707070',
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#ffffff',
    },
    ViewMenu1:{
        flex: 1,
        marginBottom:10
    },
    ViewText:{
        flex: 1
        ,justifyContent:'center'
    },
    TextWhite:{
        color: 'gray',
        fontSize: 16,
        width:width,
        fontWeight: '400',
    },
    TextWhite1:{
        color: '#000000',
        fontSize: 16,
        width:width,
        fontWeight: '400',
    },
    ViewImage:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    Icon:{
        width: width / 20,
        height: width / 20,
    },
    Icon1:{
        width: width / 20,
        height: width / 21,
    },
    Icon2:{
        width: width / 22,
        height: width / 22,
    },
    TextMenu:{
        color: 'gray',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 28,
    },
    TextMenu1:{
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 28,
    },
    ViewMenuText:{
        flex: 5,
        justifyContent: 'space-around'
    },
    ViewMenu2:{
        flex: 2.2,
        borderBottomWidth:1,
        borderBottomColor:'#cbcbcb',
        borderTopWidth:1,
        borderTopColor:'#cbcbcb',
    },
    ViewDichVu:{
        flex: 2,
        justifyContent:'center'
    },
    View2:{
        flexDirection: 'row',
        flex:8,
        marginTop:width/25
    },
    ViewImage3:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    ViewImage4:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '90%',
        paddingVertical: 5,
    },
    Image3:{
        marginLeft:width/12,
        width: width / 17,
        height: width / 20,
    }


});
