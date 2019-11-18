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
import { NavigationActions } from 'react-navigation';
const backAction = NavigationActions.back({
    key: null
  });
class HeaderOnlyBack extends Component {

    render() {
        return (
            <View style={{width:width, height:height*0.07, backgroundColor:"#d2a61f", flexDirection:'row' }}>
                <TouchableOpacity style={{width:width*0.15, height:height*0.07, justifyContent:'center', alignItems:'center'}}
                                   onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Image source={require('../../assets/icons/ic_arrow_back.png')} />
                </TouchableOpacity>
                <View style={{width:width*0.8, height:height*0.07, justifyContent:'center'}}>
                    <Text style={{color: '#000000',
                        fontSize: 20,
                        fontWeight: '400',}}>
                        {I18n.t(this.props.title)}
                    </Text>
                </View>
            </View>
        );
    }
}
export default HeaderOnlyBack;
