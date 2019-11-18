import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from "react-native";
import styles from "./LoginScreen.styles";

import React, { Component } from "react";
import styles1 from "../Button/OnlyButton";
import I18n from "../../language/I18n";
import API from "../../api/APIConstant";
import ActivityIndicatorView from "../LoadingScreen/ActivityIndicatorView";
import axios from "axios";
import FailureScreen from "../FailureScreen/index";

let imgSource;
let tockenCustomer;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    I18n.locale = "en";
  }
  state = {
    lang: 'en',
    user: "",
    pass: "",
    DataUser: "",
    ShowAlert: false,
    Message: "",
    isLoading: false
  };

  componentDidMount() {
    this._retrieveData();
    this._retrieveDataLang();
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("phoneNumBer", this.state.user);
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("phoneNumBer");
      if (value !== null) {
        // We have data!!
        this.setState({ user: value });
        console.log("valuePhone", value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _storeDataLang = async () => {
    try {
      await AsyncStorage.setItem("lang", this.state.lang);
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveDataLang = async () => {
    try {
      const value = await AsyncStorage.getItem("lang");
      if (value !== null) {
        // We have data!!
        I18n.locale = value;
        this.setState({ lang: value });
        console.log("_retrieveDataLang", value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _ClosePopup = close => {
    this.setState({ ShowAlert: close });
    this.setState({ isLoading: close });
  };
  _onChangeUser = text => {
    if (text == 0 || text == " ") {
      this.setState({ user: "" });
    } else {
      this.setState({ user: text });
    }
  };

  _onSubmit = () => {
    const { user, pass } = this.state;
    if (user === "" || pass === "") {
      this.setState({
        ShowAlert: true,
        Message: I18n.t("Vui lòng nhập đầy đủ thông tin")
      });
    } else {
      try {
        this.setState({ isLoading: true });
        const url = API.baseurl + "/rpc/login";
        const header = {
          "Content-Type": "application/json"
        };
        const data = {
          phone_number: user,
          pass: pass,
          phone_reference: "2"
        };
        axios({ method: "POST", url: url, headers: header, data: data })
          .then(response => {
            if (response.data[0].token) {
              tockenCustomer = response.data[0].token;
              const url = API.baseurl + API.getUserbyPhone(this.state.user);
              const header = {
                "Content-Type": "application/json"
              };
              axios({ method: "get", url: url, headers: header })
                .then(response => {
                  if (response.data.length === 0) {
                    this.setState({ isLoading: false });
                    this.setState({
                      ShowAlert: true,
                      Message: I18n.t("Tài khoản hoặc mật khẩu không đúng"),
                      pass: ""
                    });
                  } else {
                    this.setState({ isLoading: false });
                    this.setState({ DataUser: response.data[0] });
                    this.state.DataUser.tockenCustomer = tockenCustomer;
                    this.props.navigation.navigate("MainScreen", {
                      DataUser: this.state.DataUser, 
                      idUser: this.state.DataUser.user_id,
                      tockenCustomer: tockenCustomer
                    });
                    console.log(this.state.DataUser);
                    this._storeData();
                    this._storeDataLang();
                  }
                })
                .catch(error => {
                  this.setState({ isLoading: false });
                  this.setState({ ShowAlert: true, Message: error.message });
                });
            } else {
              this.setState({
                ShowAlert: true,
                Message: I18n.t("Tài khoản hoặc mật khẩu không đúng"),
                pass: ""
              });
            }
          })
          .catch(error => {
            console.log("_getTockenByUser" + error.message);
            this.setState({
              ShowAlert: true,
              Message: I18n.t("Tài khoản hoặc mật khẩu không đúng"),
              pass: ""
            });
          });
      } catch (e) {
        console.log(e.error);
      }
    }
  };
  _onChangePass = text => {
    if (text == "") {
      this.setState({ pass: "" });
    } else {
      this.setState({ pass: text });
    }
  };

  changelang() {
    if (this.state.lang === "vi") {
      this.setState({ lang: "en" });
      I18n.locale = "en";
      this.setState({ pass: this.state.pass });
    }
    if (this.state.lang === "en") {
      this.setState({ lang: "vi" });
      I18n.locale = "vi";
      this.setState({ pass: this.state.pass });
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    };
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/face2.png")}
        style={styles.container}
      >
        {this.state.ShowAlert ? (
          <FailureScreen
            message={this.state.Message}
            _ClosePopup={this._ClosePopup}
          />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                this.changelang();
              }}
              style={styles.viewicon}
            >
              <Image
                source={
                  this.state.lang ===Q 'vi'
                    ? require("../../assets/icons/ic_lang_vn.png")
                    : require("../../assets/icons/ic_lang.png")
                }
              />
            </TouchableOpacity>
            <View style={styles.viewlogo}>
              <Image source={require("../../assets/images/logo.png")} />
            </View>
            <View style={styles.borderphone}>
              <View style={styles.borderImagelogo}>
                <Image
                  style={styles.image1}
                  source={require("../../assets/icons/icon-vietnam-svg.png")}
                />
                <Text style={styles.text1}>+84</Text>
              </View>
              <TextInput
                value={this.state.user}
                style={styles.textinput1}
                onChangeText={this._onChangeUser}
                keyboardType={"numeric"}
                placeholder={I18n.t("Số Điện Thoại")}
                onSubmitEditing={event => {
                  this.refs.input_pass.focus();
                }}
              />
            </View>
            <View style={styles.ViewPassword}>
              <View style={styles.viewBorderInputPass}>
                <TextInput
                  value={this.state.pass}
                  secureTextEntry={true}
                  onChangeText={this._onChangePass}
                  style={styles.viewInputPass}
                  placeholder={I18n.t("Mật Khẩu")}
                  ref="input_pass"
                />
              </View>
            </View>
            <View style={styles.viewfooter}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("RegisterScreen", {
                    title: "Đăng Ký"
                  })
                }
              >
                <Text style={styles.text2}>{I18n.t("Đăng Ký")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("RegisterScreen", {
                    title: "Quên mật khẩu"
                  })
                }
              >
                <Text style={styles.textfogot}>{I18n.t("quenmk")}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles1.viewButtonlogin}>
              <TouchableOpacity
                style={styles1.touchopa1}
                onPress={this._onSubmit}
              >
                <View style={styles1.loginText}>
                  <Text style={styles1.TextLogin}>{I18n.t("Đăng Nhập")}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewRule}>
              <Text style={styles.TextButton}>
                {I18n.t("Khi đăng ký, bạn đồng ý với")}
                <Text style={styles.textLink}>
                  {I18n.t(" Điều khoản và chính sách bảo mật")}
                </Text>
              </Text>
            </View>
            {this.state.isLoading ? <ActivityIndicatorView /> : null}
          </ScrollView>
        )}
      </ImageBackground>
    );
  }
}

export default LoginScreen;
