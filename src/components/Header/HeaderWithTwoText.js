import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';
const backAction = NavigationActions.back({
    key: null
  });
class HeaderWithTwoText extends Component {

    render() {
        return (
            <View style={{width:width, height:height*0.07, backgroundColor:"#d2a61f", flexDirection:'row' }}>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
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
                    }}>{this.props.title}</Text>
                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity>
                        <Text style={{
                            color: '#000000',
                            fontFamily: 'Roboto',
                            fontSize: 20,
                            fontWeight: '400',
                        }}>{this.props.message}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default HeaderWithTwoText;
