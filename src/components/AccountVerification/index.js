import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView, Dimensions,
} from 'react-native';
import React, { PureComponent } from "react";
import styles from "./AccountVerification.Style";
import styles1 from "../Button/OnlyButton";
import I18n from "../../language/I18n";
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import FailureScreen from '../FailureScreen/index';
const language = [
  { lang: "Tiếng Việt", code: "vi" },
  { lang: "English", code: "en" }
];
import API from '../../api/APIConstant';
import axios from 'axios';
const { width, height } = Dimensions.get("screen");
let phone;
class index extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };
  state = {
    name: '',
    pass: '',
    email: '',
    confirm: '',
    ShowAlert:false,
    Message:''
  };
  componentWillMount(): void {
    phone = this.props.navigation.getParam("phoneNumber");
  }
  _ClosePopup = (close)=>{
    this.setState({ShowAlert:close})
  };
  _onSubmit = () => {
    const { name, pass, email, confirm } = this.state;
    if (name.length === 0){
      this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập họ tên')});
    } else if (pass.length === 0){
        this.setState({pass:''});
        this.setState({confirm:''});
            this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập mật khẩu')});
    } else if (email.length === 0){
        this.setState({pass:''});
        this.setState({confirm:''});
      this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập email')});
    } else if (confirm.length === 0){
        this.setState({pass:''});
        this.setState({confirm:''});
            this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập mật khẩu xác nhận')});
    } else if ( email.indexOf('@') < 1 ||
        email.lastIndexOf('.') < email.indexOf('@') + 2 ||
        email.lastIndexOf('.') > email.length) {
        this.setState({pass:''});
        this.setState({confirm:''});
          this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập đúng định dang Email')});
      }else if (pass !== confirm){
        this.setState({pass:''});
        this.setState({confirm:''});
      this.setState({ShowAlert:true,Message:I18n.t('Mật khẩu xác nhận không khớp')});
    }else {
        const accountSignUp = {
            "full_name": this.state.name.trim(),
            "phonenumber": phone,
            "password": this.state.pass,
            "email": this.state.email,
            "phone_reference":"2"
        };
        const url = API.baseurl + API.resgiter;
        const header = {
          'Content-Type': 'application/json',
        };
        axios({method: 'post', url: url, headers: header, data: accountSignUp})
            .then((response) => {
              this.props.navigation.navigate("WellcomeMemBer", {
               phoneNumber : phone,
                pass: this.state.pass
              });
            }).catch((error) => {
          this.setState({ShowAlert:true,Message:error.message});
        });
    }
  };
  _onChangeMail = text => {
    if (text == ' ') {
      this.setState({ email: "" });
    } else {
      this.setState({ email: text });
    }
  };
  _onChangeconfirm = text => {
    if (text == ' ') {
      this.setState({ confirm: "" });
    } else {
      this.setState({ confirm: text });
    }
  };
  _onPressBack = () => {
    const enibaleButton = this.props.navigation.getParam('enibaleButton')
    enibaleButton()
};
_onChangeName = text => {
  this.setState({ name: this.Capitalize(text) })
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
  render() {
    return (
        <View style={styles.container}>
          {this.state.ShowAlert? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
          :
              <ScrollView
                  scrollEnabled={false}
              >
                <HeaderOnlyBack onPressBack={this._onPressBack} title={"Xác minh tài khoản"} navigation={this.props.navigation}/>
                <View style={styles.wrapFirtName}>
                  <View style={styles.wrapImage}>
                    <Image
                        style={styles.imagePass}
                        source={require('../../assets/icons/Icon1-hdpi.png')}
                        resizeMode="contain"
                    />
                  </View>
                  <View style={{
                    width: width*0.65,
                    height: height / 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dededeff",
                  }}>
                    <Text style={{
                      color: "#a5a5a5ff",
                      height: "30%",
                      fontSize: 14,
                      fontWeight: "400",
                      fontFamily: "Roboto",
                      marginTop:"4%",
                    }}>{I18n.t("Họ và tên")}</Text>
                    <TextInput
                        onChangeText={this._onChangeName}
                        selectionColor="#d2a61f"
                        value={this.state.name}
                        style={styles.textInput1}
                        autoFocus={true}
                        ref="input_frist"
                        onSubmitEditing={event => {
                          this.refs.input_email.focus();
                        }}
                    />
                  </View>
                </View>
                <View style={styles.wrapFirtName}>
                  <View style={styles.wrapImage}>
                    <Image
                        style={styles.imagePass}
                        source={require('../../assets/icons/6-layers.png')}
                        resizeMode="contain"
                    />
                  </View>
                  <View style={{
                    width: width*0.65,
                    height: height / 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dededeff",
                  }}>
                    <Text style={{
                      color: "#a5a5a5ff",
                      height: "30%",
                      fontSize: 14,
                      fontWeight: "400",
                      fontFamily: "Roboto",
                      marginTop:"4%",
                    }}>{I18n.t("Email")}</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={this._onChangeMail}
                        selectionColor="#d2a61f"
                        style={styles.textInput1}
                        ref="input_email"
                        onSubmitEditing={event => {
                          this.refs.input_pass.focus();
                        }}
                    />
                  </View>
                </View>
                <View style={styles.wrapFirtName}>
                  <View style={styles.wrapImage}>
                    <Image
                        style={styles.imagePass}
                        source={require('../../assets/icons/ic_lock_24px.png')}
                        resizeMode="contain"
                    />
                  </View>
                  <View style={{
                    width: width*0.65,
                    height: height / 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dededeff",
                  }}>
                    <Text style={{
                      color: "#a5a5a5ff",
                      fontSize: 14,
                      fontWeight: "400",
                      fontFamily: "Roboto",
                      marginTop:"4%"
                    }}>{I18n.t('Mật Khẩu')}</Text>
                    <TextInput
                        onChangeText={text => this.setState({ pass: text })}
                        secureTextEntry={true}
                        selectionColor="#d2a61f"
                        value={this.state.pass}
                        style={styles.textInput1}
                        ref="input_pass"
                        onSubmitEditing={event => {
                            this.refs.input_pass_confrim.focus();
                        }}
                    />
                  </View>
                </View>
                <View style={{
                  width: width*0.8,
                  height: height / 14,
                  flexDirection: 'row',
                  marginLeft: width*0.05,
                  paddingHorizontal: 20,
                  alignItems : 'center',
                  marginTop:10,

                }}>
                  <View style={styles.wrapImage}>
                  </View>
                  <View style={{
                    width: width*0.65,
                    height: height / 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dededeff",
                  }}>
                    <TextInput
                        onChangeText={this._onChangeconfirm}
                        secureTextEntry={true}
                        selectionColor="#d2a61f"
                        placeholder={I18n.t('Nhập lại mật khẩu')}
                        value={this.state.confirm}
                        placeholderTextColor="#727272"
                        style={{
                          width: width*0.65,
                          color: "#d2a61f",
                          fontSize: 16,
                          height: "100%",
                        }}
                        ref="input_pass_confrim"
                    />
                  </View>
                </View>
                <View style={styles.viewButtonlogin}>
                  <TouchableOpacity style={styles1.touchopa1} onPress={this._onSubmit}>
                    <View style={styles1.loginText}>
                      <Text style={styles1.TextLogin}>{I18n.t("Hoàn thành")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
          }

        </View>

    );
  }
}
export default index;
