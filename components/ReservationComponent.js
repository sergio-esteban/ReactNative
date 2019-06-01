import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      outsideTable: false,
      date: '',
      showModal: false
    }
  }

  static navigationOptions = {
    title: 'Reserve Table',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      guests: 1,
      outsideTable: false,
      date: '',
      showModal: false
    });
  }

  handleAlert() {
    const { guests, outsideTable, date, showModal } = this.state;
    Alert.alert(
      'Your Reservation OK?',
      `Number of guests: ${guests}\n Outside Table? ${outsideTable}\n Date and Time:${date}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => this.resetForm(),
        },
        {
          text: 'OK',
          onPress: () => this.resetForm(),
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={1000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Outside Table?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.outsideTable}
              trackColor={{ true: '#15DB95' }}
              ios_backgroundColor='#15DB95'
              thumbColor='#0D19A3'
              onValueChange={(value) => this.setState({ outsideTable: value })}>
            </Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              style={{ flex: 2, marginRight: 20, width: 200 }}
              date={this.state.date}
              format='YYYY-MM-DD'
              mode="datetime"
              minDate="2019-05-01"
              maxDate="2019-12-01"
              placeholder="Select date and Time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Button
              onPress={() => this.handleAlert()}
              title="Reserve"
              color="#0D19A3"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          {/* <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => { this.toggleModal(); this.resetForm() }}
            onRequestClose={() => { this.toggleModal(); this.resetForm() }}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your Reservation</Text>
              <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
              <Text style={styles.modalText}>Outside Table? : {this.state.outsideTable ? 'Yes' : 'No'}</Text>
              <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
              <Button
                title="Close"
                color="#0D19A3"
                accessibilityLabel="close this button your table it's already reserved"
                onPress={() => { this.toggleModal(); this.resetForm() }}>
              </Button>
            </View>
          </Modal> */}
        </Animatable.View>
      </ScrollView >
    );
  }

};

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderBottomColor: '#bbb',
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1,
    color: '#0D19A3',
    padding: 20,
    height: 50,
    width: 100
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#0D19A3',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default Reservation;