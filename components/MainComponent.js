import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';


const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  },
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      },
      headerLeft: <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      },
      headerLeft: <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#0D19A3'
      },
      headerTintColor: '#15DB95',
      headerTitleStyle: {
        color: '#15DB95'
      },
      headerLeft: <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInt={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo-keeprules.png')} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>keeprules</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="home"
          type="font-awesome"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="info-circle"
          type="font-awesome"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="list"
          type="font-awesome"
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="address-card"
          type="font-awesome"
          size={22}
          color={tintColor}
        />
      )
    }
  }
}, {
    drawerBackgroundColor: '#0D19A3',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#15DB95',
      inactiveTintColor: '#fff',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#fff',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerImage: {
    margin: 10,
    width: 60,
    height: 61
  },
  drawerHeaderText: {
    color: '#0D19A3',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default Main;