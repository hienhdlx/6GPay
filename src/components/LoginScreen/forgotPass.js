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
  Alert
} from "react-native";
import React, { Component } from "react";
import styles1 from "../Button/OnlyButton";
import HeaderWithTwoText from "../Header/HeaderWithTwoText";
import I18n from "../../language/I18n";
import styles from "../RegisterScreen/RegisterScreen.styles";
import ActivityIndicatorView from "../LoadingScreen/ActivityIndicatorView";
let title;
let phoneNumber;
import API from "../../api/APIConstant";
import axios from "axios";
import FailureScreen from "../FailureScreen/index";
class forgotPass extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    };
  };
  state = {
    Pass: "",
    ShowAlert: false,
    Message: "",
    isLoading: false,
    confirm: ""
  };

  componentWillMount(): void {
    // title = this.props.navigation.getParam("title");
    phoneNumber = this.props.navigation.getParam("phoneNumber");
  }
  _ClosePopup = close => {
    this.setState({ ShowAlert: close });
  };
  _onSubmit = () => {
    if (this.state.confirm !== this.state.Pass) {
      alert(I18n.t("Mật khẩu xác nhận không khớp"));
    } else {
      const url =
        "http://3.124.107.180:3000/users?phone_number=eq." + phoneNumber;
      const header = {
        "Content-Type": "application/json"
      };
      const body = {
        password: this.state.Pass
      };
      axios({ method: "patch", url: url, headers: header, data: body })
        .then(response => {
          Alert.alert(
            I18n.t("taothanhcong"),
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.navigate("LoginScreen");
                  this.setState({ isLoading: false });
                }
              }
            ],
            { cancelable: false }
          );
        })
        .catch(error => {
          this.setState({ ShowAlert: true, Message: error.message });
          this.setState({ isLoading: false });
        });
    }
  };
  _onChangePhone = text => {
    if (text == 0 || text == ".") {
      this.setState({ Pass: "" });
    } else {
      this.setState({ Pass: text.replace(/^0+/, "") });
    }
  };
  _onChangePhone1 = text => {
    if (text == 0 || text == ".") {
      this.setState({ confirm: "" });
    } else {
      this.setState({ confirm: text.replace(/^0+/, "") });
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
        {" "}
        {this.state.ShowAlert ? (
          <FailureScreen
            message={this.state.Message}
            _ClosePopup={this._ClosePopup}
          />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <HeaderWithTwoText
              navigation={this.props.navigation}
              title={I18n.t("Quên mật khẩu")}
              message={null}
            />{" "}
            <View style={styles.borderphone1}>
              <TextInput
                value={this.state.PhoneNumber}
                style={styles.textinput1}
                placeholder={I18n.t("Mật Khẩu")}
                secureTextEntry={true}
                onChangeText={this._onChangePhone}
              />{" "}
            </View>{" "}
            <View style={styles.borderphone1}>
              <TextInput
                value={this.state.PhoneNumber}
                style={styles.textinput1}
                placeholder={I18n.t("Nhập lại mật khẩu")}
                secureTextEntry={true}
                onChangeText={this._onChangePhone1}
              />{" "}
            </View>{" "}
            <View style={styles.viewfooter} />{" "}
            <View style={styles1.viewButtonlogin}>
              <TouchableOpacity
                style={styles1.touchopa1}
                onPress={this._onSubmit}
              >
                <View style={styles1.loginText}>
                  <Text style={styles1.TextLogin}> {I18n.t("Tiếp Tục")} </Text>{" "}
                </View>{" "}
              </TouchableOpacity>{" "}
            </View>{" "}
            <View style={styles.viewRule} />{" "}
          </ScrollView>
        )}{" "}
        {this.state.isLoading ? <ActivityIndicatorView /> : null}{" "}
      </View>
    );
  }
}
export default forgotPass;
