import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { Font } from 'expo';
////that will be obtained from my redux store:
// import { DISHES } from '../shared/dishes';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';

// const styles = StyleSheet.create({
//   baseText: {
//     fontFamily: 'open-sans-bold',
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   titleText: {
//     fontFamily: 'open-sans-bold',
//     fontSize: 40,
//     fontWeight: "bold",
//   }
// });


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return (
      <Loading />
    );
  }
  else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
          featuredTitleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        >
          <Text style={{ fontFamily: 'source-sans-pro', fontSize: 14 }}>
            {item.description}{'\n'}{'\n'}
          </Text>
          <Button
            icon={
              <Icon
                name="md-card"
                type="ionicon"
                size={26}
                color="white"
              />
            }
            iconRight
            title="Buy Now "
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#84fab0', '#8fd3f4'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          />
        </Card>
      )
    } else {
      return (
        <View></View>
      );
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-pro': require('../assets/fonts/SourceSansPro-Regular.ttf'),
    });
    this.animate()
    this.setState({ fontLoaded: true });
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 8,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }}>
          <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            isLoading={this.props.dishes.isLoading}
            erreMess={this.props.dishes.erreMess}
          />
        </Animated.View>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
          <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            isLoading={this.props.promotions.isLoading}
            erreMess={this.props.promotions.erreMess}
          />
        </Animated.View>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
          <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            isLoading={this.props.leaders.isLoading}
            erreMess={this.props.leaders.erreMess}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);