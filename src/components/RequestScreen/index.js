import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    Platform,
    ScrollView,
    FlatList,
    Animated,
    Easing,
    RefreshControl,
    ActivityIndicator,
    ImageBackground
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
class RequestScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            header: null

        };
    };

    render() {
        return (
            <ImageBackground source={require("../../assets/images/backgroud.png")} style={styles.container }>
                <View style={{width:width*0.8, height: height*0.05, marginTop: height*0.2, marginHorizontal: width/10, borderBottomWidth: 2, borderBottomColor: '#CBCBCB',flexDirection:'row'}}>
                    <View style={{width:width/10, height: height*0.05,paddingVertical: width/40,  }}>
                        <Image
                            source={require("../../assets/images/Group.png")}
                        />
                    </View>
                    <View style={{width:width/2, height: height*0.05 , paddingVertical: width/60}}>
                        <Text style={{color:'#FFFFFF', fontWeight: "bold", fontSize:24}}>100.000</Text>
                    </View>
                    <View style={{width:width/5, height: height*0.05 , paddingVertical: width/60}}>
                        <Text style={{color:'#FFFFFF', fontWeight: "bold", fontSize:24}}>VND</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{ color:"#a5a5a5", marginTop: height/20,textAlign: 'center'}}>I18n.t(Ghi Chú)</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: width,
                        height: height / 10,
                        flexDirection: 'row',
                        paddingHorizontal: width / 10,
                        paddingVertical: height / 40,
                        marginTop: "90%"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: height / 17,
                            width: width / 3,
                            marginBottom: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            flexDirection: 'row',
                            backgroundColor: '#d2a61f',
                            marginTop: 5,
                            marginRight: width / 7,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontSize:20}}>I18n.t(Xác nhận)</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: height / 17,
                            width: width / 3,
                            marginBottom: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            flexDirection: 'row',
                            backgroundColor: '#cbcbcb',
                            marginTop: 5,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontSize:20}}>I18n.t(Huỷ)</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, marginTop: Platform.OS === "ios" ? 35 : 0,
    },
});
export default RequestScreen;
