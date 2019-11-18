import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./Failure.styles";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import styles1 from '../Button/ButtonColor';
import I18n from '../../language/I18n';
class FailureScreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>{this.props.message}</Text>
          </View>
          <View style={styles.viewFooter}>
              <TouchableOpacity
                  onPress={() => this.props._ClosePopup(false)}
                  style={styles1.viewButton2}
              >
                  <View style={styles1.viewTouchsmall}>
                      <Text style={styles1.text6}>{I18n.t('Đóng')}</Text>
                  </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default FailureScreen;
