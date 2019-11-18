import {
    View,
    Text,
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import I18n from '../../language/I18n';
class HeaderOnlyText extends Component {

    render() {
        return (
            <View style={{width:width, height:height*0.07, backgroundColor:"#d2a61f" }}>
                <View style={{paddingLeft:20, height:height*0.07, justifyContent:'center'}}>
                    <Text style={{color: '#000000',
                        fontSize: 20,
                        fontWeight: '400',}}>{I18n.t(this.props.title)}</Text>
                                    </View>
            </View>
        );
    }
}
export default HeaderOnlyText;
