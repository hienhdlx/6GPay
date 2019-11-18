import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    ImageBackground,
} from 'react-native';
let DataUser;
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import styles from '../ManinScreen/MenuStyle';
import Header from '../Header/HeaderProfile';
import I18n from '../../language/I18n';

const language = [
    {lang:'Tiếng Việt',code:'vi'},
    {lang:'English',code:'en'},
];

class Menu extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,
        };
    };
    _onToMain = () => {
        this.props.navigation.navigate("MainScreen")
    };
    componentWillMount(): void {
        DataUser = this.props.navigation.getParam('DataUser');
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/icons/IconBackGround.png')}
                             style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0}}>
                <View style={styles.ViewLogo}>
                    <Image source={require('../../assets/images/logo.png')}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.ViewHoSo}>
                        <View style={styles.ViewMenu1}>
                            <View style={styles.ViewText}>
                                <Text style={styles.TextWhite1}>{I18n.t('Hồ sơ')} </Text>
                            </View>
                            <View style={{flex: 1.5, flexDirection: 'row'}}>
                                <View style={styles.ViewImage}>
                                    <Image
                                        style={styles.Icon}
                                        source={require('../../assets/icons/person.png')}
                                    />
                                    <Image
                                        style={styles.Icon1}
                                        source={require('../../assets/icons/Group1.png')}
                                    />
                                </View>
                                <View style={styles.ViewMenuText}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EditProfile',{DataUser: DataUser})}}>
                                        <Text style={styles.TextMenu1}>{I18n.t('hoso')} </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={[styles.TextMenu ]}> {I18n.t('Phương thức thanh toán')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ViewMenu2}>
                            <View style={styles.ViewDichVu}>
                                <Text style={styles.TextWhite}>{I18n.t('Dịch vụ')} </Text>
                            </View>
                            <View style={styles.View2}>
                                <View style={styles.ViewImage4}>
                                    <Image
                                        style={styles.Icon}
                                        source={require('../../assets/icons/qr-code.png')}
                                    />
                                    <Image
                                        style={styles.Icon1}
                                        source={require('../../assets/icons/2-layers.png')}
                                    />
                                    <Image
                                        style={styles.Icon}
                                        source={require('../../assets/icons/Phone1.png')}
                                    />
                                    <Image
                                        style={styles.Icon}
                                        source={require('../../assets/icons/ChuyenTien.png')}
                                    />
                                    <Image
                                        style={styles.Icon2}
                                        source={require('../../assets/icons/Money.png')}
                                    />
                                </View>
                                <View style={{flex: 5, justifyContent: 'space-between', height: '90%'}}>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}>{I18n.t('QR Pay')} </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}>{I18n.t('Chạm và thanh toán')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}> {I18n.t('Trò chuyện')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}>{I18n.t('Chuyển tiền quốc tế')} </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}> {I18n.t('Tiền điện tử')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1.3}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={styles.TextWhite}>{I18n.t('Thông tin')}  </Text>
                            </View>
                            <View style={{flex: 0.3}}/>
                            <View style={{flex: 1.5, flexDirection: 'row'}}>
                                <View style={styles.ViewImage3}>
                                    <Image
                                        style={styles.Icon}
                                        source={require('../../assets/icons/accept.png')}
                                    />
                                    <Image
                                        style={styles.Icon1}
                                        source={require('../../assets/icons/question.png')}
                                    />
                                </View>
                                <View style={{flex: 5, justifyContent: 'space-around'}}>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}> {I18n.t('Điều khoản và điều kiện')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.TextMenu}> {I18n.t('Dịch vụ khách hàng')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1}}/>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                        onPress={this._onToMain}>
                            <Image
                                style={styles.Image3}
                                source={require('../../assets/icons/MenuIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Menu;
