import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {PureComponent} from 'react';
import styles from './MainOTP.Style';
import styles1 from '../Button/OnlyButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import I18n from '../../language/I18n';
import HeaderWithTwoText from '../Header/HeaderWithTwoText';
import axios from 'axios';
import API from '../../api/APIConstant';
import FailureScreen from '../FailureScreen';

const language = [
    {lang: 'Tiếng Việt', code: 'vi'},
    {lang: 'English', code: 'en'},
];
let Phone;
let dataSchool;
let token;
let DataUser;
let title;
class index extends PureComponent {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,
        };
    };
    state = {
        code: '',
        resetOTp: true,
        messageInfoOTP: '',
        ShowAlert: false,
        message: I18n.t("Vui lòng nhập mã OTP")
    };

    componentWillMount(): void {
        this.paymentInfo = this.props.navigation.getParam('paymentInfo');
        Phone = this.props.navigation.getParam('PhoneNumber');
        title = this.props.navigation.getParam('checkid');
        dataSchool = this.props.navigation.getParam('dataSchool');
        DataUser = this.props.navigation.getParam('DataUser');
        if (this.paymentInfo) {
            if(DataUser.tockenCustomer !== undefined){
                token = DataUser.tockenCustomer;
            }
            this._getOTP(DataUser.phone_number);
        }
        if (Phone === undefined || Phone === null || Phone === ''){
            Phone = dataSchool.phone_number;
        }
        if(title === 'Register' || title === 'forgotPass'){
            this._getOTP(Phone);
        }
    }
    _onSubmit = async () => {
        this.setState({ isDisabled: true });
        if (this.state.code === '') {
            this.setState({ShowAlert: true, Message: this.setState({messageInfoOTP: this.state.message})});
        } else if (this.paymentInfo) {
            if (dataSchool !== undefined || dataSchool !== null || dataSchool !== ''){
                this._senderMonyByRequest(this.state.code);
            }

        } else {
            if(title === 'forgotPass'){
                let curentDataOtp = this.state.dataTockenOTP;
                const url = API.urlOTP + 'checkOtp';
                const data = {"id":curentDataOtp.id,"token":this.state.code};
                const header = {
                    'Content-Type': 'application/json',
                    'client': '6G-Pay'
                };
                axios({method: 'POST', url: url, data: data, headers: header})
                    .then((response) => {
                        if (response.data.success === true){
                            this.props.navigation.navigate('forgotPass', {
                                phoneNumber: Phone,
                            });
                        }else {
                            this.setState({
                                messageInfoOTP: I18n.t('Ma OTP sai'),
                                code: '',
                                ShowAlert: true
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                        this.setState({isLoading: false});
                    });
            } if(title === 'Register'){
                await this._checkOTP(this.state.code);
            }

        }
    };

    _senderMonyByRequest = (code) => {
        try {
            let curentDataOtp = this.state.dataTockenOTP;
            const url = API.urlOTP + 'checkOtp';
            const data = {"id":curentDataOtp.id,"token":code};
            const header = {
                'Content-Type': 'application/json',
                'client': '6G-Pay'
            };
            axios({method: 'POST', url: url, data: data, headers: header})
                .then((response) => {
                    if (response.data.success === true){
                        this.setState({isLoading: true});
                        const url = API.baseurl + '/rpc/send_money';
                        const header = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        };
                        const data = {
                            "amount": dataSchool.amount,
                            "message": dataSchool.message,
                            "receiver_wallet_id": dataSchool.sender_wallet_id,
                            "timetz": "2019-10-21",
                            "sender_wallet_id": dataSchool.receiver_wallet_id
                        };
                        axios({method: 'POST', url: url, headers: header, data: data})
                            .then((response) => {
                                this.setState({
                                    dataTransactionsReceiver: response.data,
                                    isLoading: false
                                });
                                this._updateRequest();
                            })
                            .catch((error) => {
                                console.log(error.message);
                                this.setState({isLoading: false});
                            });
                    }else {
                        this.setState({
                            messageInfoOTP: I18n.t('Ma OTP sai'),
                            code: '',
                            ShowAlert: true
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _updateRequest = () => {
        try {
            this.setState({isLoading: true});
            const url = API.baseurl + '/requests?requests_id=eq.' + dataSchool.requests_id;
            const header = {
                'Content-Type': 'application/json',
            };
            const data = {"request_status": "1"};
            axios({method: 'PATCH', url: url, headers: header, data: data})
                .then((response) => {
                    this.props.navigation.navigate("MainScreen");
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _onOTP = (code) => {
        this.setState({ code: code });
    };

    _resetOTP = async () => {
       await  this.setState({ code: '' });
       await  this.setState({ resetOTp: false });
       await  this.setState({ resetOTp: true });
        this._getOTP(Phone);
    };

    _getOTP = (phone) => {
        try{
            const url = API.urlOTP + 'getOtp';
            const data = {
                "mobile": '84'+phone,
                "action": "register"
            };const header = {
                'Content-Type': 'application/json',
                'client': '6G-Pay'
            };
            axios({method: 'POST', url: url, data: data, headers: header})
                .then((response) => {
                    if (response.data.success === true){
                        this.setState({
                            dataOTP: response.data,
                            dataTockenOTP: response.data.data
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });

        }catch(e){
            console.log('_getOTP ' + e.error);
        }
    };

    _checkOTP = (code) => {
        try {
            let curentDataOtp = this.state.dataTockenOTP;
            const url = API.urlOTP + 'checkOtp';
            const data = {"id":curentDataOtp.id,"token":code};
            const header = {
                'Content-Type': 'application/json',
                'client': '6G-Pay'
            };
            axios({method: 'POST', url: url, data: data, headers: header})
                .then((response) => {
                    if (response.data.success === true){
                        this.props.navigation.navigate('AccountVerification', {
                            phoneNumber: Phone,
                        });
                    }else {
                        this.setState({
                            messageInfoOTP: I18n.t('Ma OTP sai'),
                            code: '',
                            ShowAlert: true
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_checkOTP ' + e.error);
        }
    };
    _ClosePopup = (close)=>{
        this.setState({ShowAlert:close})
    };
    render() {
        return (
            <View style={styles.container}>
                {this.state.ShowAlert?<FailureScreen message={this.state.messageInfoOTP} _ClosePopup={this._ClosePopup}/>
                    :
                    <View >
                        {
                           title === 'Register' || title === 'forgotPass' ? 
                           <HeaderWithTwoText onPressBack={this._onPressBack} navigation={this.props.navigation} title={'+84' + Phone} message={null}/>
                           :
                           <HeaderWithTwoText onPressBack={this._onPressBack} navigation={this.props.navigation} title="OTP" message={null}/>
                        }
                        <View style={styles.wrapheader}>
                            <View style={styles.wrapText}>
                                <View style={styles.wrapText1}>
                                    <Text style={styles.text}>{I18n.t('Mã xác minh')}</Text>
                                </View>
                            </View>
                            <View style={styles.wrapTextinput}>
                                <View style={styles.wrapImage}>
                                    <Image
                                        style={styles.image1}
                                        source={require('../../assets/icons/ic_phone_1.5px-hdpi.png')}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.wrapOTP}>
                                    { this.state.resetOTp && <OTPInputView
                                        ref={(refs) => this.OTPInputView = refs}
                                        pinCount={4}
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        autoFocusOnLoad
                                        code={this.state.code}
                                        onCodeChanged = {this._onOTP}
                                        //onCodeFilled={code => this.setState({code: code})}
                                    />}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.wrapView} onPress={this._resetOTP}>
                                <Text style={styles.text2}>{I18n.t('Gửi lại mã xác minh')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewButtonlogin}>
                            <TouchableOpacity
                                style={styles1.touchopa1}
                                onPress={this._onSubmit}>
                                <View style={styles1.loginText}>
                                    <Text style={styles1.TextLogin}>{I18n.t('Xác Nhận')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

export default index;
