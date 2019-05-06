import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { View, Platform, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#0D19A3"
      },
      headerTitleStyle: {
        color: "#15DB95"
      },
      headerTintColor: "#15DB95",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('DrawerToggle')} />
    })
  })

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#0D19A3"
      },
      headerTitleStyle: {
        color: "#15DB95"
      },
      headerTintColor: "#15DB95",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('DrawerToggle')} />
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
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name="md-home"
          type="ionicon"
          size={26}
          color={tintColor}
          focused={true}
          iconStyle={{
            opacity: .8,
          }}
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
          name="md-information-circle"
          type="ionicon"
          size={26}
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
          name="md-basket"
          type="ionicon"
          size={26}
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
          name="md-contact"
          type="ionicon"
          size={26}
          color={tintColor}
        />
      )
    }
  },
  Favorites:
  {
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='heart'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Reservation:
  {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  }
}, {
    drawerBackgroundColor: '#0D19A3',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#15DB95',
      inactiveTintColor: '#fff',
      itemsContainerStyle: {
        marginVertical: 10,
      },
      iconContainerStyle: {
        opacity: 1,
      }
    }
  });
class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
        {/* {() => <Menu dishes={this.props.dishes} />} */}
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
    fontSize: 26,
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);