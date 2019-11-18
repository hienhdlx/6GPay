import React, { PureComponent } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './SplashScreen.style';
import { SOGENT_START } from '../../assets';

class SplashScreen extends PureComponent {

  componentDidMount() {
    const { navigation } = this.props
    setTimeout(() => {
      navigation.navigate('AuthStack')
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={SOGENT_START} 
          style={styles.container}
        />
      </View>
    );
  }
}

export default SplashScreen