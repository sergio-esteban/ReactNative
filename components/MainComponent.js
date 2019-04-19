import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';


const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      }
    }
  })

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      }
    }
  })

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      }
    }
  })

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      }
    }
  })

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
    }
  }
}, {
    drawerBackgroundColor: '#0D19A3'
  });
class Main extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
        {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
      </View>
    );
  }

}

export default Main;