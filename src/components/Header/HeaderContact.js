import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import I18n from '../../language/I18n';
class HeaderContact extends Component {

    render() {
        return (
            <View style={{width:width, height:height*0.07, backgroundColor:"#d2a61f", flexDirection:'row' }}>
                <View style={{flex:1.5,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Image
                            style={{
                                width: width / 21,
                                height: width / 21,
                            }}
                            source={require('../../assets/icons/BackBlack.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flex:7,justifyContent:'center'}}>
                    <Text style={{
                        color: '#000000',
                        fontFamily: 'Roboto',
                        fontSize: 20,
                        fontWeight: '400',
                    }}>{I18n.t("Danh sách liên hệ")}</Text>
                </View>
                <View style={{flex:1.5,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Contact')}}>
                        <Image
                            style={{
                                width: width / 19,
                                height: width / 15,
                            }}
                            source={require('../../assets/icons/IconContact.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default HeaderContact;
