import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions, Platform,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import I18n from '../../language/I18n';

class HeaderSearch extends Component {

    render() {
        return (
            <View style={{width: width, height:height*0.07, backgroundColor: '#d2a61f', flexDirection: 'row'}}>
                <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity  onPress={()=>{this.props.navigation.goBack()}}>
                        <Image
                            style={{
                                width: width / 21,
                                height: width / 21,
                            }}
                            source={require('../../assets/icons/BackBlack.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 7, justifyContent: 'center'}}>
                    <View style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 5,
                        width: '90%',
                        height: '60%',
                        flexDirection: 'row',
                    }}>
                        <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                style={{
                                    width: width / 18,
                                    height: width / 18,
                                }}
                                source={require('../../assets/icons/ic_search_.png')}
                            />
                        </View>
                        <View style={{flex: 8, width: width}}>
                            <TextInput style={Platform.OS === "ios" ? {
                                fontFamily: 'Roboto',
                                fontSize: 16,
                                fontWeight: '400',
                                height: '100%',

                            }
                            :
                            {
                                fontFamily: 'Roboto',
                                fontSize: 16,
                                fontWeight: '400',
                                height: 40,

                            }}
                                       placeholder={I18n.t("Tên hoặc số điện thoại")}
                                       placeholderTextColor='#a5a5a5'
                            />
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

export default HeaderSearch;
