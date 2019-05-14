import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
// import { DISHES } from '../shared/dishes';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';


class Contact extends Component {

  static navigationOptions = {
    title: 'Contact Us'
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card
            title='Contact Information'
            titleStyle={{ color: '#282629', fontWeight: 'bold', fontSize: 18, }}>
            <View style={styles.drawerHeader}>
              <Text style={{ marginBottom: 10 }}>121, Clear Water Bay Road</Text>
              <Text style={{ marginBottom: 10 }}>Clear Water Bay, Kowloon</Text>
              <Text style={{ marginBottom: 10 }}>HONG KONG</Text>
              <Text style={{ marginBottom: 10 }}>Tel: +852 1234 5678</Text>
              <Text style={{ marginBottom: 10 }}>Fax: +852 8765 4321</Text>
              <Text style={{ marginBottom: 10 }}>Email: confusion@food.net</Text>
            </View>
          </Card >
        </Animatable.View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderBottomColor: '#bbb',
  }
})

export default Contact;