import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
////that will be obtained from my redux store:

// import { DISHES } from '../shared/dishes';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image }}
      >
        <Text style={{ margin: 10 }}>
          {item.description}
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

class Home extends Component {

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={this.props.promotions.promotions.filter(promo => promo.featured)[0]} />
        <RenderItem item={this.props.leaders.leaders.filter(leader => leader.featured)[0]} />
      </ScrollView >
    );
  }
}

export default connect(mapStateToProps)(Home);