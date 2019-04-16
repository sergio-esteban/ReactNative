import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { DISHES } from '../shared/dishes';
import { createStackNavigator } from 'react-navigation';


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
class Main extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MenuNavigator />
        {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
      </View>
    );
  }

}

export default Main;