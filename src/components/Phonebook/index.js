import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView, Dimensions,
} from 'react-native';
import React, {PureComponent} from 'react';
import styles from './Phonebook.Style';
import styles1 from '../Button/ButtonColor';
import I18n from '../../language/I18n';
import HeaderContact from '../Header/HeaderContact';
import API from '../../api/APIConstant';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import FailureScreen from '../FailureScreen/index'
const { width, height } = Dimensions.get("screen");
let balance;
let base64Icon = 'data:image/png;base64,';
const language = [
    {lang: 'Tiếng Việt', code: 'vi'},
    {lang: 'English', code: 'en'},
];
let check = '';
let UserSendwalletId = '';
let DataUser = '';
let value;
const data = [
    {
        key: 'abc123',
        phone: '789987789',
        image: '',
    },

];
class index extends PureComponent {
    state = {
        phoneInput: '',
        indexChangeView: 0,
        data: data,
        DataPush: [],
        DataUser: '',
        DataUserReceiver: '',
        isChoise: false
    };

    componentWillMount(): void {
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                check = this.props.navigation.getParam('commit');
                UserSendwalletId = this.props.navigation.getParam('UserSendwalletId');
                DataUser = this.props.navigation.getParam('DataUser');
                console.log(DataUser);
                balance = this.props.navigation.getParam('balance');
                this._retrieveData();
            }
        );


    }

    _ClosePopup = (close) => {
        this.setState({ShowAlert: close});
        this.setState({isLoading:close});
    };
    _retrieveData = async () => {
        try {
            value = await AsyncStorage.getItem(JSON.stringify(DataUser.phone_number));
            if (value !== null) {
                console.log(JSON.parse(value));
                let DataCallBack = JSON.parse(value);
                const newArray = [];
                DataCallBack.forEach(obj => {
                    if (!newArray.some(o => o.user_id === obj.user_id)) {
                        newArray.push({...obj});
                    }
                });
                this.setState({DataPush: newArray});
                console.log(this.state.DataPush);
            }
        } catch (error) {
        }
    };
    _onSubmit = () => {
        const {phoneInput} = this.state;
        if (phoneInput === '') {
            this.setState({ShowAlert: true, Message: I18n.t('Vui lòng nhập số điện thoại')});
        } else {
            if (phoneInput === DataUser.phone_number) {
                this.setState({ShowAlert: true, Message: I18n.t('daylasomaycuaban')});
            } else {
                if (check === 'Chuyển tiền') {
                    try {
                        const url = API.baseurl + API.getUserbyPhone(this.state.phoneInput);
                        const header = {
                            'Content-Type': 'application/json',
                        };
                        axios({method: 'get', url: url, headers: header})
                            .then((response) => {
                                if (response.data.length === 0) {
                                    this.setState({ShowAlert: true, Message: I18n.t('SoDienThoaiKhongDung')});
                                } else {
                                    this.setState({DataUserReceiver: response.data[0]});
                                    this.state.DataPush.unshift(this.state.DataUserReceiver);
                                    console.log(this.state.DataPush);

                                    this.props.navigation.navigate('SendScreen', {
                                        commit: check,
                                        DataUserReceiver: this.state.DataUserReceiver,
                                        UserSendwalletId: UserSendwalletId,
                                        balance: balance,
                                        DataUser:DataUser,
                                        DataPush:this.state.DataPush
                                    });
                                }

                            }).catch((error) => {
                            alert(error.message);
                        });
                    } catch (e) {
                        console.log(e.error);
                    }
                } else if (check === 'Yêu cầu chuyển tiền') {
                    try {
                        const url = API.baseurl + API.getUserbyPhone(this.state.phoneInput);
                        const header = {
                            'Content-Type': 'application/json',
                        };
                        axios({method: 'get', url: url, headers: header})
                            .then((response) => {
                                if (response.data.length === 0) {
                                    this.setState({ShowAlert: true, Message: I18n.t('SoDienThoaiKhongDung')});
                                } else {
                                    this.setState({DataUserReceiver: response.data[0]});
                                    this.state.DataPush.unshift(this.state.DataUserReceiver);
                                    this.props.navigation.navigate('SendScreen', {
                                        commit: check,
                                        DataUserReceiver: this.state.DataUserReceiver,
                                        UserSendwalletId: UserSendwalletId,
                                        balance: balance,
                                        DataUser:DataUser,
                                        DataPush:this.state.DataPush
                                    });
                                }
                            }).catch((error) => {
                            alert(error.message);
                        });
                    } catch (e) {
                        console.log(e.error);
                    }
                }
            }
        }
    };
    _onChangeView = async (item, index) => {
        if (index === this.state.indexChangeView) {
            await this.setState({ isChoise: !this.state.isChoise });
            if (this.state.isChoise) {
                this.setState({
                    phoneInput: item.phone_number,
                    DataPush: [...this.state.DataPush],
                });
            } else {
                this.setState({
                    phoneInput: '',
                    DataPush: [...this.state.DataPush],
                });
            }
        } else (
            this.setState({
                phoneInput: item.phone_number,
                indexChangeView: index,
                isChoise: true,
                DataPush: [...this.state.DataPush],
            })
        )
    };
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,
        };
    };

    _renderItem = ({item, index}) => {
        const image = item.photo;
        const isShow = this.state.isChoise && this.state.indexChangeView === index;
        return (
            <View style={styles.wrapViewFlatList}>
                <View>
                    <TouchableOpacity
                        style={styles.wrapPhone}
                        onPress={() => this._onChangeView(item, index)}
                    >
                        <View>
                            {image === null?<Image
                                style={{width: 60,
                                    height: 60,
                                    borderRadius: 60 / 2}}
                                source={require('../../assets/icons/contactprofile.png')}
                                resizeMode="contain"
                                />
                                :
                                <Image
                                    resizeMode="cover"
                                    style={styles.imageFlatList}
                                    source={{uri:base64Icon + image}}
                                />
                            }
                            <Text style={styles.textPhone1}>+84{item.phone_number.slice(0,4)}...</Text>
                        </View>
                    </TouchableOpacity>
                    {isShow && (
                        <View style={styles.styleImage3}>
                            <View style={styles.wrapImageTick}>
                                <Image
                                    style={styles.imageTick}
                                    resizeMode="contain"
                                    source={require('../../assets/icons/tick.png')}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    };
    _onChangeText =  text => {
        if (text === "") {
            this.setState({ isChoise: false });
        }
        if ( text.length < 9 ) {
            this.setState({ isChoise: false });
        }
         this.setState({phoneInput: text.replace(/\D|^0+/g, '')});
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderContact navigation={this.props.navigation}/>
                {this.state.ShowAlert ? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
                    :
                    <ScrollView>
                        <View style={styles.wrapTopBody}>
                            <View style={styles.wrapImage}>
                                <Image
                                    source={require('../../assets/icons/icon-vietnam-svg.png')}
                                    style={styles.styleImage}
                                />
                                <View style={styles.styleText}>
                                    <Text style={styles.text}>{I18n.t('+84')}</Text>
                                </View>
                            </View>
                            <View style={styles.wrapTextInput}>
                                <TextInput
                                    value={this.state.phoneInput}
                                    style={styles.wrapTextphone}
                                    placeholder={I18n.t('Số Điện Thoại')}
                                    onChangeText={this._onChangeText}
                                    placeholderTextColor="#ffffffff"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.body1}>
                                <Text style={styles.text1}>{I18n.t('Liên hệ gần đây')}</Text>
                            </View>
                        </View>
                        <View style={styles.wrapFlatList}>
                            <FlatList data={this.state.DataPush.slice(0, 10)} renderItem={this._renderItem}
                                      numColumns={4}/>
                        </View>
                        <View style={{
                            width: width,
                            bottom: 10
                        }}>
                            <View style={styles1.viewButtonsmall}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MainScreen')}
                                    style={styles1.ViewTouch}
                                >
                                    <View style={styles1.viewTouchsmall}>
                                        <Text style={styles1.text6}>{I18n.t('Huỷ')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._onSubmit}
                                    style={styles1.viewButton2}
                                >
                                    <View style={styles1.viewTouchsmall}>
                                        <Text style={styles1.text6}>{I18n.t('Xác Nhận')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

export default index;
