import React, { memo } from 'react';
import { View, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type StatusBarStyle = "default" | "light-content" | "dark-content";
type optionalProps = {
  backgroundColor: any,
  barStyle: StatusBarStyle,
  height: any,
  skipAndroid: boolean
}

const defaultProps: optionalProps = {
  barStyle: 'light-content',
  backgroundColor: 'transparent',
  height: undefined,
  skipAndroid: false
}


const MyStatusBar = (props: optionalProps) => {
  const {
    barStyle, 
    backgroundColor, 
    height, 
    skipAndroid
  } = props;
  const TOP = height || getStatusBarHeight(skipAndroid);
  return (
    <View>
      <View style={{ backgroundColor, width: '100%', height: TOP }} />
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        hidden={false}
        barStyle={barStyle}
      />
    </View>
  );
};
MyStatusBar.defaultProps = defaultProps;
export default memo(MyStatusBar);
