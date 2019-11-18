import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
class HeaderMenu extends Component {
    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            header: null
        };
    };
    _onToProfile = () => {
        this.props.navigation.navigate("Profile",);
    };
    _onToMenu = () => {
        this.props.navigation.navigate("Menu");
    };


    render() {
        return (
            <View style={{width:width, height:height*0.07,backgroundColor:"#d2a61f", flexDirection:'row',alignItems:'center',justifyContent:'space-between' ,paddingHorizontal:width/12}}>
                <View>
                <TouchableOpacity
                    onPress={this._onToMenu}
                >
                    <Image
                        style={styles.IconMenu}
                        source={require('../../assets/icons/MenuBlack.png')}
                    />
                </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image
                            style={styles.IconLogo}
                            source={require('../../assets/icons/6Gblack.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={this._onToProfile}
                    >
                        <Image
                            style={styles.IconProfile}
                            source={require('../../assets/icons/Iconperson.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    IconMenu:{
        width: width / 17,
        height: width / 20,
    },
    IconLogo:{
        width: width / 10,
        height: width / 10,
    },
    IconProfile:{
        width: width / 18,
        height: width / 18,
    }
});
export default HeaderMenu;
