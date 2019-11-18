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
class HeaderProfile extends Component {
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
                        fontSize: 20,
                        fontWeight: '400',
                    }}>{this.props.editPayment?I18n.t("Thông tin thanh toán"):"Profile"}</Text>
                </View>
                <View style={{flex:1.5,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity>
                        {this.props.editPayment?
                            <Text style={{color: '#000000', fontSize: 20, fontWeight: '400',}}>{I18n.t("Sửa")}</Text>
                            :
                            <Image
                                style={{
                                    width: width / 18,
                                    height: width / 16,
                                }}
                                source={require('../../assets/icons/IconProfileLine.png')}
                            />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default HeaderProfile;
