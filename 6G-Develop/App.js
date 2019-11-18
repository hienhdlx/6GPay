import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
// import { AsyncStorage } from 'react-native';
// import firebase from 'react-native-firebase';
export default class App extends Component{

    // async componentDidMount() {
    //     // this.checkPermission();
    //     this.createNotificationListeners(); //add this line
    // }
    //
    // componentWillUnmount() {
    //     this.notificationListener();
    //     this.notificationOpenedListener();
    // }
    // ////////////////////// Add these methods //////////////////////
    //
    // //Remove listeners allocated in createNotificationListeners()
    // componentWillUnmount() {
    //     this.notificationListener();
    //     this.notificationOpenedListener();
    // }
    //
    // async createNotificationListeners() {
    //     /*
    //     * Triggered when a particular notification has been received in foreground
    //     * */
    //     this.notificationListener = firebase.notifications().onNotification((notification) => {
    //         const { title, body } = notification;
    //         this.showAlert(title, body);
    //     });
    //
    //     /*
    //     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    //     * */
    //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //         const { title, body } = notificationOpen.notification;
    //         this.showAlert(title, body);
    //     });
    //
    //     /*
    //     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    //     * */
    //     const notificationOpen = await firebase.notifications().getInitialNotification();
    //     if (notificationOpen) {
    //         const { title, body } = notificationOpen.notification;
    //         this.showAlert(title, body);
    //     }
    //     /*
    //     * Triggered for data only payload in foreground
    //     * */
    //     this.messageListener = firebase.messaging().onMessage((message) => {
    //         //process data message
    //         console.log(JSON.stringify(message));
    //     });
    // }
    //
    // showAlert(title, body) {
    //     Alert.alert(
    //         title, body,
    //         [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ],
    //         { cancelable: false },
    //     );
    // }

    render() {
        return (
            <AppNavigation />
        )
    }
}
