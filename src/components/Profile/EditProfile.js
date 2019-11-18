import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    Platform,
    TextInput,
    ScrollView,
    Alert,
    NativeModules,
    ActivityIndicator,
    FlatList,
    Keyboard
} from 'react-native';
let DataUser;
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import styles from '../Profile/ProfileStyle';
import I18n from '../../language/I18n';
import API from '../../api/APIConstant';
import axios from 'axios';
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
var ImagePicker = NativeModules.ImageCropPicker;
let base64Icon = 'data:image/png;base64,';
class EditProfile extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,
        };
    };
    state={
        EditName:false,
        EditEmail:false,
        DataUser:'',
        LinkImage:'',
        image: "",
        nameEdit:'',
        emailEdit:'',
        option: null,
        DataDebit:'',
        userId: '',
        isLoading: false
    };

    _onToNewBank = () => {
        this.props.navigation.navigate('AssociatedBank', {
            userId: this.state.userId
        });
    };
    pickSingle() {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            includeBase64: true,
            cropping: false,
            compressImageMaxWidth: 500,
            compressImageMaxHeight: 500,
            compressImageQuality: 0.5,
            compressVideoPreset: "MediumQuality",
            includeExif: true,
            mediaType: "photo"
        })
            .then(image => {

                    this.setState({
                        image: {
                            uri: image.path,
                            width: image.width,
                            height: image.height,
                            mime: image.mime,
                            data: image.data,
                        },
                        option: null
                    });
                console.log("received image", this.state.image);
            })
            .catch(e => {
            });
    }
    pickSingleWithCamera(cropping, mediaType = 'photo') {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            includeBase64: true,
            cropping: false,
            compressImageMaxWidth: 500,
            compressImageMaxHeight: 500,
            compressImageQuality: 0.5,
            compressVideoPreset: "MediumQuality",
            includeExif: true,
            mediaType: "photo"
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    data: image.data,
                },
                option: null
            });
        }).catch(e => {

        });
    }
    renderImage(image) {
        return (
                <Image
                    style={styles.ImageAvatar}
                    source={image}
                />
        );
    }
    renderAsset(image) {
        return this.renderImage(image);
    }
    componentWillMount(): void {
        this.setState({ isLoading: true });
        DataUser = this.props.navigation.getParam('DataUser');
        console.log('DataUser', DataUser);
        const url = API.baseurl+ API.getUserbyPhone(DataUser.phone_number);
        const header = {
            'Content-Type': 'application/json',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                this.setState({DataUser:response.data[0]});
                this.setState({userId: response.data[0].user_id })
                this.setState({nameEdit: response.data[0].full_name});
                this.setState({emailEdit: response.data[0].email});
                this.setState({ userId: response.data[0].user_id });
                console.log(response.data);
                this.setState({ isLoading: false });
            }).catch((error) => {
            this.setState({ShowAlert:true,Message:error.message});
            this.setState({ isLoading: false })
        });
        try {
            const url = API.baseurl + API.debitcard(DataUser.user_id) ;
            console.log(url);
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({DataDebit: response.data});
                    console.log(this.state.DataDebit);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }catch (e) {
            console.log(e.message);
        }
    }
    _delete=(id)=>{
        Alert.alert(
            I18n.t('Bạn có muốn huỷ liên kết với thẻ này không?'),
            '',
            [
                {
                    text: I18n.t('Không'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: I18n.t('Có'), onPress: () =>{

                        const header = {
                            'Content-Type': 'application/json',
                        };
                        const url = API.baseurl +'/debit_card?debitcard_id=eq.' + id
                        axios({method: 'delete', url: url, headers: header})
                            .then(response =>{
                                this.props.navigation.navigate("MainScreen");
                                this.setState({isLoading:false});
                            })
                            .catch(error => {
                                alert(error)
                            });



                    }
                },
            ],
            {cancelable: false},
        );
    };
    _renderRequest =({item,index})=>{
        return (
            <TouchableOpacity
                onLongPress={()=>{
                   this._delete(item.debitcard_id)
                }}
            >
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
                    <Text style={styles.TextBankNumber}>* * * * * * * * * * {item.card_number.slice(-4)}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    };
    _EditName = () =>{
        this.setState({EditName:true});
        this.EditName.focus();
    };
    _onChangeName = text => {
            this.setState({ nameEdit: this.Capitalize(text) });
    };
    Capitalize(str){
       const index =  str.indexOf(' ')
       let string = []
       if (index === -1) {
           return str.charAt(0).toUpperCase() + str.slice(1);
       } else {
           const arrayString = str.split(' ')
           arrayString.forEach(element => {
               string = [...string, `${element.charAt(0).toUpperCase() + element.slice(1)}`]
           });
           return string.join(' ')
       }
    }
    _onChangeEmail = text => {
        this.setState({ emailEdit: text });
    };
    _EditEmail = () =>{
        this.setState({EditEmail:true});
        this.EditEmail.focus();
    };
    _EditAccout = () =>{
        if (this.state.emailEdit === '') {
            alert(I18n.t('Không được để trống email'))
        }else if (this.state.nameEdit === ''){
            alert(I18n.t('Không được để trống tên'))
        } else if ( this.state.emailEdit.indexOf('@') < 1 ||
            this.state.emailEdit.lastIndexOf('.') < this.state.emailEdit.indexOf('@') + 2 ||
            this.state.emailEdit.lastIndexOf('.') > this.state.emailEdit.length) {
            alert(I18n.t('Vui lòng nhập đúng định dang Email'));
        }else {
            this.setState({isLoading:true});
            const accountEdit = {
                "full_name": this.state.nameEdit.trim(),
                "phone_number": DataUser.phone_number.trim(),
                "password": this.state.DataUser.password,
                "email": this.state.emailEdit.trim(),
                "timestamp": this.state.DataUser.timestamp,
                "photo": this.state.image.data,
                "wallet_id": this.state.DataUser.wallet_id
            };
            console.log(JSON.stringify(accountEdit));
            const url = API.baseurl + API.editInformation(this.state.DataUser.user_id);
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'patch', url: url, headers: header, data: accountEdit})
                .then((response) => {

                    this.props.navigation.navigate("MainScreen");
                    this.setState({isLoading:false});
                }).catch((error) => {
                alert(error.message)
            });
        }

    };
    onLogOut=()=>{
        Alert.alert(
            I18n.t('Bạn có chắc chắn muốn thoát?'),
            '',
            [
                {
                    text: I18n.t('Không'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: I18n.t('Có'), onPress: () => this.props.navigation.navigate("LoginScreen")},
            ],
            {cancelable: false},
        );
    };
    render() {
        return (
            <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0, backgroundColor: '#000000'}}>
                <ScrollView>
                    <View
                        style={{width: width, height: height * 0.07, backgroundColor: '#d2a61f', flexDirection: 'row'}}>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.goBack();
                            }}>
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
                            <Text style={{
                                color: '#000000',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                fontWeight: '400',
                            }}>{I18n.t("hoso")}</Text>
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={
                                    this._EditAccout
                                }
                            >
                                <Text style={{
                                    color: '#000000',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    fontWeight: '400',
                                }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ViewAvatar}>
                        <View style={{justifyContent: 'flex-end'}}>
                            {this.state.image ? (
                                this.renderAsset(this.state.image)
                            ) : (
                                <Image style={styles.ImageAvatar}
                                       source={{uri: base64Icon + this.state.DataUser.photo}}/>
                            )}

                            <TouchableOpacity style={{
                                position: 'absolute',
                                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                height: 40,
                                width: height / 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                                              onPress={() => {this.setState({option: 1})}}
                            >
                                    <Image
                                        style={{
                                            width: width / 20,
                                            height: width / 20,
                                        }}
                                        source={require('../../assets/icons/EditAvata.png')}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:20}}>
                            <TextInput
                                style={{ height: 50,
                                    color: '#ffffff',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    fontWeight: '700',
                                    lineHeight: 22,
                                    }}
                                ref={(refs) => this.EditName = refs}
                                onChangeText={this._onChangeName}
                                value={this.state.nameEdit}
                                editable={this.state.EditName}
                                underlineColorAndroid={'transparent'}
                            ></TextInput>
                            <TouchableOpacity onPress={this._EditName}>
                            <Image
                                style={{
                                    width: width / 26,
                                    height: width / 26,
                                    marginLeft:10
                                }}
                                source={require('../../assets/icons/PenGold.png')}
                            />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 6, marginTop: height / 26}}>
                        <Text style={styles.TextGold}>{I18n.t('Thông tin cá nhân')}</Text>
                        <View style={styles.ViewMail}>
                            <Image
                                style={styles.ImageMail}
                                source={require('../../assets/icons/Mail1.png')}
                            />
                            <TextInput
                                style={{ height: 40,
                                    marginLeft: width / 10,
                                    color: '#ffffff',
                                    fontSize: 16,
                                    fontWeight: '400',
                                    lineHeight: 22,
                                    width: "65%"
                                }}
                                onSubmitEditing={(event) => { Keyboard.dismiss(); this.EditEmail.focus()}}
                                blurOnSubmit={false}
                                ref={(refs) => this.EditEmail = refs}
                                onChangeText={this._onChangeEmail}
                                value={this.state.emailEdit}
                                editable={this.state.EditEmail}
                                underlineColorAndroid={'transparent'}
                            ></TextInput>
                            <TouchableOpacity onPress={this._EditEmail}>
                                <Image
                                    style={{
                                        width: width / 26,
                                        height: width / 26,
                                        marginLeft:10
                                    }}
                                    source={require('../../assets/icons/PenGold.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.ViewLine}
                        />
                        <View style={styles.ViewPhone}>
                            <Image
                                style={styles.ImagePhone}
                                source={require('../../assets/icons/Phone.png')}
                            />
                            <Text style={styles.TextPhone}> +84 {this.state.DataUser.phone_number} </Text>

                        </View>
                        <Text style={styles.TextTopUp}>{I18n.t('Thông tin thanh toán')}</Text>
                        <FlatList
                            data={this.state.DataDebit}
                            numColumns={1}
                            renderItem={this._renderRequest}
                            keyExtractor={(item, index) => {
                                return item.toString() + index.toString();
                            }}
                        />
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
                                onPress={()=>{this.onLogOut()}}
                            >
                                <Text style={{
                                    color: '#d2a61f',
                                    fontFamily: 'Roboto',
                                    fontSize: 20,
                                    fontWeight: '400',
                                }}>{I18n.t("LOG OUT")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.option ?
                        <View style ={{
                            width: width*0.9,
                            height: "25%",
                            marginHorizontal: width*0.05
                        }} >
                            <View
                            style = {{width: width*0.9, height: "60%", borderRadius: 10}}>
                                <TouchableOpacity style={{width: width*0.9, height: "50%", borderTopLeftRadius:10,flexDirection:'row', borderTopRightRadius:10, backgroundColor: '#ffffff', borderBottomColor:'gray',borderBottomWidth:1}}
                                                  onPress={this.pickSingleWithCamera.bind(this)}
                                >
                                    <View style={{width: "40%", justifyContent:'center' , marginLeft:"10%" }}>
                                        <Text>{I18n.t("Take photo")}</Text>
                                    </View>
                                    <View style={{width: "30%",  alignItems:'center', justifyContent:'center' }}>
                                    </View>
                                    <View style={{width: "20%", alignItems:'center', justifyContent:'center'}}>
                                        <Image source={require('../../assets/icons/ic_camera.png')} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: width*0.9, height: "50%", borderBottomLeftRadius:10, borderBottomRightRadius:10,flexDirection:'row', backgroundColor: '#ffffff'}}
                                                  onPress={this.pickSingle.bind(this)}
                                >
                                    <View style={{width: "40%", justifyContent:'center', marginLeft:"10%" }}>
                                        <Text>{I18n.t("Photo Library")}</Text>
                                    </View>
                                    <View style={{width: "30%",  alignItems:'center', justifyContent:'center' }}>
                                    </View>
                                    <View style={{width: "20%", alignItems:'center', justifyContent:'center'}}>
                                        <Image source={require('../../assets/icons/ic_photo_library.png')} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                style={{width: width*0.9, height: "30%", borderRadius: 10, marginTop: height * 0.01 ,backgroundColor: '#ffffff', justifyContent:'center', alignItems:'center'}}
                                onPress={() => {
                                    this.setState({option: null})
                                }
                                }
                            >
                                        <Text style={{
                                            color: '#000000',
                                            fontFamily: 'Roboto',
                                            fontSize: 16,
                                            fontWeight: '700',
                                        }}>{I18n.t("Huỷ")}</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        null
                }
                 {this.state.isLoading ?
                            <ActivityIndicatorView/>
                            :
                            null
                        }
            </View>
        );
    }
}


export default EditProfile;
