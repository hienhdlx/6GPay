import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native';
let base64Icon = 'data:image/png;base64,';
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import styles from '../Profile/ProfileStyle';
import I18n from '../../language/I18n';
import API from '../../api/APIConstant';
import axios from 'axios';


class index extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,

        };
    };
    state={
        DataUser:'',
        LinkImage:'',
        userId: ''
    };
    componentDidMount(): void {
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                let DataUser = this.props.navigation.getParam('DataUser');
                this.setState({ userId: DataUser.user_id });
                console.log('DataUser', DataUser);
                const url = API.baseurl+ API.getUserbyPhone(DataUser.phone_number);
                const header = {
                    'Content-Type': 'application/json',
                };
                axios({method: 'get', url: url, headers: header})
                    .then((response) => {
                        this.setState({DataUser:response.data[0]});
                    }).catch((error) => {
                    this.setState({ShowAlert:true,Message:error.message});
                });
            }
        );
    }
    _onToNewBank = () => {
        this.props.navigation.navigate('AssociatedBank', {
            userId: this.state.userId
        });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0, backgroundColor: '#000000'}}>
                <ScrollView>
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
                            }}>{I18n.t('Thông tin cá nhân')}</Text>
                        </View>
                        <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{navigate('EditProfile',{DataUser: this.state.DataUser})}}>
                                <Text style={{
                                    color: '#000000',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    fontWeight: '400',
                                }}>{I18n.t('Sửa')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ViewAvatar}>
                        <Image style={styles.ImageAvatar}
                               source={{uri: base64Icon + this.state.DataUser.photo}}/>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: '700',
                            lineHeight: 22,
                            marginTop:10
                        }}> {this.state.DataUser.full_name} </Text>
                    </View>
                    <View style={{flex: 6, marginTop: height / 26}}>
                        <Text style={styles.TextGold}>{I18n.t('Thông tin cá nhân')}</Text>
                        <View style={styles.ViewMail}>
                            <Image
                                style={styles.ImageMail}
                                source={require('../../assets/icons/Mail1.png')}
                            />
                            <Text style={styles.TextMail}> {this.state.DataUser.email} </Text>
                        </View>
                        <View
                            style={styles.ViewLine}
                        />
                        <View style={styles.ViewPhone}>
                            <Image
                                style={styles.ImagePhone}
                                source={require('../../assets/icons/Phone.png')}
                            />
                            <Text style={styles.TextPhone}> +84{this.state.DataUser.phone_number} </Text>
                        </View>
                        <Text style={styles.TextTopUp}>{I18n.t('Thông tin thanh toán')}</Text>
                        <View style={styles.ViewTopUp}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.ViewBank}>
                                    <Image
                                        style={styles.ImageVPBank}
                                        source={require('../../assets/icons/MB-bank.png')}
                                    />
                                </View>
                                <View style={{justifyContent: 'center', flex: 5}}>
                                    <Text style={styles.TextBank}>MBBank</Text>
                                </View>
                                <View style={styles.ViewCheck}>
                                    <Image
                                        style={styles.ImageCheck}
                                        source={require('../../assets/icons/ic_check_circle.png')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.TextBankNumber}>* * * * * * * * * * 3708</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={this._onToNewBank}
                        >
                            <View style={styles.ViewButton}>
                                <Image
                                    style={styles.ImageAdd}
                                    source={require('../../assets/icons/AddBlack.png')}
                                />
                                <Text style={styles.TextAdd}>{I18n.t('Thêm ngân hàng')}</Text>
                            </View>
                        </TouchableOpacity>
                            <View style={{
                                marginHorizontal: width / 11,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: height / 10,
                            }}>
                                <TouchableOpacity
                                    onPress={()=>{alert('Log Out')}}
                                >
                                <Text style={{
                                    color: '#d2a61f',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    fontWeight: '400',
                                }}>LOG OUT</Text>
                                </TouchableOpacity>
                            </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default index;
