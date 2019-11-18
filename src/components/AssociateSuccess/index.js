import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions, ScrollView,
} from 'react-native';
import styles from './AssociateSuccessStyles';
import React, { Component } from "react";
import styles1 from '../Button/OnlyButton';
import I18n from '../../language/I18n';
import HeaderOnlyText from '../Header/HeaderOnlyText';
import commonStyle from '../../Style/CommonStyle';
const { width, height } = Dimensions.get("screen");
class index extends Component {
      render() {
            return (
                  <View style={[commonStyle.container, styles.spaceBetween]}>
                        <HeaderOnlyText title={"Liên kết"} />
                        <View style={styles.borderHeader}>
                              <Image source={require('../../assets/icons/icon_success.png')} />
                              <Text style={styles.styletext}>{I18n.t('Hoàn Tất')}</Text>
                        </View>
                        <View style={[styles.viewBorder, styles.heightViewButton]}>
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

export default index;
