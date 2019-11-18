import {Dimensions, Platform, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get("screen");

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 35 : 0,
    },
    viewicon:{
        width: width*0.15,
        height: height / 15,
        justifyContent : 'center',
        alignItems:'flex-end',
        marginLeft:width*0.7
    },
    viewlogo:{
        width: width,
        alignItems: 'center',
        marginTop: height* 0.08,
    },
    borderphone: {
        width: width*0.8,
        height: height / 14,
        flexDirection: 'row',
        marginLeft: width*0.1,
        paddingHorizontal: 20,
        backgroundColor:'#FFFFFF',
        borderRadius: 10,
        alignItems : 'center',
        marginTop:width*0.15
    },
    borderImagelogo:{
        height: height / 22,
        flexDirection: 'row',
        marginRight: width/20,
        alignItems : 'center',
    },

    image1:{
        width: 26,
        height: 17,
    },

    text1: {
        fontSize: 16,
        marginLeft: width*0.01,
    },

    textinput1 : {
        marginTop: Platform.OS === "ios" ? width/150 : width/90,
        justifyContent: 'center',
        width: width/2,
        color: '#7F7F7F',
        height: 40,
        fontSize: 16,
    },

    ViewPassword: {
        width: width*0.8,
        height: height / 14,
        flexDirection: 'row',
        marginLeft: width*0.1,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: height*0.04,
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },

    viewBorderInputPass :{
        height: height / 22,
        marginRight: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    viewInputPass :{
        width: width / 2,
        color: '#7F7F7F',
        height: 40,
        alignItems:'center',
        alignSelf: 'center',
        justifyContent:'center',
        fontSize: 16,
    },

    viewfooter:{
        width: width*0.9,
        height: height / 7,
        marginTop: width*0.06,
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    text2:{
        color: '#d2a61f',
        fontSize:15,
        fontWeight: 'bold',
        marginLeft: '25%',
    },
    textfogot:{
        color: '#d2a61f',
        fontSize:15,
        fontWeight: 'bold',
    },

    viewRule:{
        flexDirection:'row',
        flex: 1,
        flexWrap: 'wrap',
        width: width*0.9,
        height: height / 10,
        paddingVertical: height / 30,
        marginLeft: width*0.04,
    },

    textLink:{
        color: '#d2a61f',
        flex: 1, flexWrap: 'wrap'
    },

    TextButton:{
        color:"#FFFFFF",
        textAlign:'center'
    },

    textcontent:{
        width: width,
        color:"#FFFFFF",
    }
});
