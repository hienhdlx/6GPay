import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import I18n from '../../../language/I18n';
const {width, height} = Dimensions.get('screen');

export default class OptionScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowPoup: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            header: null
        };
    };

    render() {
        return (
            <View style={{
                flex: 1,
                width:width,
                height:height,
                position:'absolute',
                zIndex:1000,
                backgroundColor: 'rgba(6,34,36,0.87)',
            }}>
                <View style={{
                    position: 'absolute',
                    bottom: 50,
                    right: 10,
                    alignItems:'flex-end',
                    paddingHorizontal: 10,
                }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom: 10
                        }}

                        onPress = {() => this.props.navigation.navigate('DuplucationScreen',
                            {
                                commit: 'Nạp tiền',
                                title:'Top up',
                            }
                            )}
                    >
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 50,
                            marginRight: 8
                        }}>{I18n.t("Nạp tiền")}</Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: '#00b141',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 35/2
                        }}>
                            <Image source={require('../../../assets/icons/iconnap.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom: 10
                        }}

                        onPress = {() => this.props.navigation.navigate('DuplucationScreen',
                            {
                                commit: 'Rút Tiền',
                                title:'Withdrawal',
                            }
                            )}
                    >
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 50,
                            marginRight: 8
                        }}>{I18n.t('Rút Tiền')}</Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: '#0186fb',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 35/2
                        }}>
                            <Image source={require('../../../assets/icons/iconrut.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom: 10
                        }}

                        onPress = {() => this.props.navigation.navigate('PhoneBook',
                            {
                                commit: 'Chuyển tiền'
                            }
                            )}
                    >
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 50,
                            marginRight: 8
                        }}>{I18n.t('Chuyển tiền')}</Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: '#ffb300',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 35/2
                        }}>
                            <Image source={require('../../../assets/icons/icongui.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom: 10
                        }}

                        onPress = {() => this.props.navigation.navigate('PhoneBook',
                            {
                                commit: 'Yêu cầu chuyển tiền'
                            }
                            )}
                    >
                        <Text style={{
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 50,
                            marginRight: 8
                        }}>{I18n.t('Yêu cầu chuyển tiền')}</Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: '#00b141',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 35/2
                        }}>
                            <Image source={require('../../../assets/icons/iconchuyen.png')}/>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
