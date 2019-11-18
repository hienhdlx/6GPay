import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './MainScreen.style';
import MyStatusBar from '../../components/MyStatusBar';

class MainScreen extends PureComponent {
  state = {  }
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
      </View>
    );
  }
}

export default MainScreen;