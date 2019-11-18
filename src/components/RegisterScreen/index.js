import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import styles1 from "../Button/OnlyButton";
import HeaderWithTwoText from "../Header/HeaderWithTwoText";
import I18n from "../../language/I18n";
import styles from "./RegisterScreen.styles";
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
let title;

import API from '../../api/APIConstant';
import axios from 'axios';
import FailureScreen from '../FailureScreen/index';
class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };
  state = {
    PhoneNumber: "",
      ShowAlert:false,
      Message:'',
      isLoading:false

  };

  componentWillMount(): void {
    title = this.props.navigation.getParam("title");
  }
    _ClosePopup = (close)=>{
        this.setState({ShowAlert:close})
    };
  _onSubmit = () => {
    const { PhoneNumber } = this.state;
    if (PhoneNumber === "") {
        this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập số điện thoại')})
    } else if (PhoneNumber.length < 9) {
        this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập đủ số điện thoại')})
    } else if (PhoneNumber.length > 9) {
        this.setState({ShowAlert:true,Message:I18n.t('Số điện thoại không lớn hơn 10 chữ số')})
    } else {
        this.setState({isLoading:true});
        if(title === "Quên mật khẩu"){
            try {
                const url = API.baseurl+ API.getUserbyPhone(this.state.PhoneNumber);
                const header = {
                    'Content-Type': 'application/json',
                };
                axios({method: 'get', url: url, headers: header})
                    .then((response) => {
                        if (response.data.length !== 0) {
                            this.props.navigation.navigate("MainOTP", {
                                checkid: 'forgotPass',
                                PhoneNumber: PhoneNumber
                            });
                            this.setState({isLoading:false});
                        }else {
                            this.setState({isLoading:false});
                            this.setState({ShowAlert:true,Message:I18n.t('Số điện thoại không đúng định dạng hoặc chưa đăng ký')})
                        }

                    }).catch((error) => {
                    this.setState({ShowAlert:true,Message:error.message});
                    this.setState({isLoading:false});
                });
            }catch(e)
            {
                console.log(e.error);
            }
        }else {
            try {
                const url = API.baseurl+ API.getUserbyPhone(this.state.PhoneNumber);
                const header = {
                    'Content-Type': 'application/json',
                };
                axios({method: 'get', url: url, headers: header})
                    .then((response) => {
                        if (response.data.length === 0) {
                            this.props.navigation.navigate("MainOTP", {
                                checkid: 'Register',
                                PhoneNumber: this.state.PhoneNumber
                            });
                            this.setState({isLoading:false});
                        }else {
                            this.setState({isLoading:false});
                            this.setState({ShowAlert:true,Message:I18n.t('Số điện thoại không đúng định dạng hoặc đã đăng ký')})
                        }

                    }).catch((error) => {
                    this.setState({ShowAlert:true,Message:error.message});
                    this.setState({isLoading:false});
                });
            }catch(e)
            {
                console.log(e.error);
            }
        }
    }


  };
  _onChangePhone = text => {
    if (text == 0 || text == '.') {
      this.setState({ PhoneNumber: text.replace(/\D|^0+/g, '')});
    } else {
      this.setState({ PhoneNumber: text.replace(/\D|^0+/g, '')});
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000",
          marginTop: Platform.OS === "ios" ? 35 : 0
        }}
      >
          {this.state.ShowAlert?<FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
              :
              <ScrollView style={{ flex: 1 }}>
                  <HeaderWithTwoText
                      navigation={this.props.navigation}
                      title={I18n.t(title)}
                      message={null}
                  />
                  <View style={styles.borderphone}>
                      <View style={styles.borderImagelogo}>
                          <Image
                              style={styles.image1}
                              source={require('../../assets/icons/icon-vietnam-svg.png')}
                          />
                          <Text style={styles.text1}>+84</Text>
                      </View>
                      <TextInput
                          value={this.state.PhoneNumber}
                          style={styles.textinput1}
                          keyboardType={"numeric"}
                          placeholder={I18n.t('Số Điện Thoại')}
                          onChangeText={this._onChangePhone}
                      />
                  </View>
                  <View style={styles.viewfooter} />
                  <View style={styles1.viewButtonlogin}>
                      <TouchableOpacity
                          style={styles1.touchopa1}
                          onPress={this._onSubmit}
                      >
                          <View style={styles1.loginText}>
                              <Text style={styles1.TextLogin}>{I18n.t("Tiếp Tục")} </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.viewRule} />
              </ScrollView>
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
export default RegisterScreen;
