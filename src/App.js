import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, NativeEventEmitter, SafeAreaView, StatusBar, ScrollView, Header } from 'react-native';
import CustomModule from './modules/custom_module';

export default class App extends Component {
  //  Our constructor
  constructor(props) {
    super(props);

    this.state = {
      ourEventObjectValue: "Initial object value before fire"
    }
  }

  // Called immediately after a component is mounted
  componentDidMount() {
    const eventEmitter = new NativeEventEmitter(CustomModule);

    // Remember to change the event name to whatever you pass on [fireNativeEvent]
    this.eventListener = eventEmitter.addListener('CustomEventName', (event) => {
      console.log(event)
      this.setState({
        ourEventObjectValue: event.property
      });
    });
  }

  // Called immediately before a component is destroyed
  componentWillUnmount() {
    this.eventListener.remove(); //Removes the listener
  }

  /** Calls our custom module to fire an event.
  For flexibilty, I allowed the ability to pass the event name here **/
  fireNativeEvent() {
    CustomModule.sendEvent("CustomEventName")
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <View>
          <Text style={styles.textStyle}>{this.state.ourEventObjectValue.toString()}</Text>
          <Button
            title="Fire Native Event"
            onPress={this.fireNativeEvent}
          />
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  textStyle: {
    color: "#FF0000",
    fontSize: 30,
  }
})