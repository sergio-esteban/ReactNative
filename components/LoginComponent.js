import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from "react-native-elements";
import { SecureStore, Permissions, ImagePicker } from 'expo';
import { createBottomTabNavigator } from "react-navigation";
import { baseUrl } from "../shared/baseUrl";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true });
        }
      })
  }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='person'
        type='ionicon'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    )
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({ username: this.state.username, password: this.state.password })
      )
        .catch((error) => console.log('Could not save user info', error))
    }
    else {
      SecureStore.deleteItemAsync('userinfo')
        .catch((error) => console.log('Could not delete user info', error));
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Username'
          leftIcon={
            <Icon
              name='md-person'
              size={24}
              type='ionicon'
              color='#241C15'
            />
          }
          leftIconContainerStyle={{
            paddingRight: 20,
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder='Password'
          leftIcon={
            <Icon
              name='md-lock'
              size={24}
              type='ionicon'
              color='#241C15'
            />
          }
          leftIconContainerStyle={{
            paddingRight: 20,
          }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={<Icon name='person' type='ionicon' size={24} color="white" />}
            buttonStyle={{ backgroundColor="#4885ED" }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'image/logo.png'
    }
  }

  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='person-add' //user-plus
        type='ionic'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder='Username'
            leftIcon={
              <Icon
                name='md-person'
                size={24}
                type='ionicon'
                color='#241C15'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Password'
            leftIcon={
              <Icon
                name='md-lock'
                size={24}
                type='ionicon'
                color='#241C15'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='First name'
            leftIcon={
              <Icon
                name='md-person'
                size={24}
                type='ionicon'
                color='#241C15'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Last name'
            leftIcon={
              <Icon
                name='md-person'
                size={24}
                type='ionicon'
                color='#241C15'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder='Email'
            leftIcon={
              <Icon
                name='md-person'
                size={24}
                type='ionicon'
                color='#241C15'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title='Remember Me'
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={<Icon name='person-add' type='ionicon' size={24} color="white" />}
              buttonStyle={{ backgroundColor="#4885ED" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  formInput: {
    margin: 15
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
})

export default LoginTab;