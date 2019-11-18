import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler
} from "react-native";
import styles from './SuccessfulStyles';
const { width, height } = Dimensions.get("screen");
let title;
import React, { Component } from "react";
import styles1 from '../Button/OnlyButton';
import I18n from '../../language/I18n';
import HeaderOnlyText from '../Header/HeaderOnlyText';
class SuccessfulScreen extends Component {
    componentWillMount(): void {
        title = this.props.navigation.getParam('option');
        console.log(title);
    }

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('MainScreen')
        return true;
      });
    }
  
    componentWillUnmount() {
      this.backHandler.remove();
    }

    render() {
    return (
      <View style={styles.container}>
        <HeaderOnlyText title={title}/>
        <View style={styles.borderHeader}>
          <Image source={require('../../assets/icons/icon_success.png')} />
          <Text style={styles.styletext}>{I18n.t('Hoàn Tất')}</Text>
        </View>
        <View style={styles.viewBorder}>
          <View style={styles1.viewButtonlogin}>
            <TouchableOpacity
              style={styles1.touchopa1}
              onPress={() => this.props.navigation.navigate('MainScreen')}
            >
              <View style={styles1.loginText}>
                <Text style={styles1.TextLogin}>{I18n.t('Đóng')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SuccessfulScreen;
