import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
class HeaderTextRight extends Component {

    render() {
        return (
            <View style={{width:width, height:height*0.07, backgroundColor:"#d2a61f", flexDirection:'row' }}>
                <TouchableOpacity style={{width:width*0.15, height:height*0.07, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/icons/ic_arrow_back.png')} />
                </TouchableOpacity>
                <View style={{width:width*0.6, height:height*0.07, justifyContent:'center'}}>
                    <Text style={{color: '#000000',
                        fontSize: 20,
                        fontWeight: '400',}}> This is page's name</Text>
                </View>
                <TouchableOpacity style={{width:width*0.2, height:height*0.07, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color: '#000000',
                        fontSize: 20,
                        fontWeight: '400',}}> Bỏ Qua</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default HeaderTextRight;
