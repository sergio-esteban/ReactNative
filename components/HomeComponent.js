import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'source-sans-pro': require('../assets/fonts/SourceSansPro-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess} />
        <RenderItem item={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess} />
        <RenderItem item={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess} />
      </ScrollView >
    );
  }
}

export default connect(mapStateToProps)(Home);