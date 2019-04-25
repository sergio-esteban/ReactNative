import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient';
// import { LEADERS } from '../shared/leaders'; ////that will be obtained from my redux store
import { connect } from 'react-redux';
import { baseUrl } from "../shared/baseUrl";


const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
}

const History = () => {
  return (
    <Card
      title='Our History' titleStyle={{ color: '#282629', fontWeight: 'bold' }}
    >
      <View style={styles.drawerHeader}>
        <Text style={{ marginBottom: 10 }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
        <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
      </View>
    </Card>
  );
}

class About extends Component {

  static navigationOptions = {
    title: 'About Us'
  }

  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          titleStyle={{ color: '#282629', fontWeight: 'bold' }}
          subtitle={item.description}
          subtitleStyle={{ color: '#1A2744' }}
          hideChevron={true}
          topDivider={true}
          chevronColor="white"
          chevron
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          linearGradientProps={{
            colors: ['#D3D3D3', '#E8EBF0'],
            start: [1, 0],
            end: [0.2, 0],
          }}
          // ViewComponent={LinearGradient}
          pad={20}
          // onPress={() => navigate('Dishdetail', { dishId: item.id })}
          leftAvatar={{ rounded: true, source: { uri: baseUrl + item.image } }}
        />
      );
    }

    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <History />
        <Card title='Corporate Leadership' titleStyle={{ color: '#282629', fontWeight: 'bold' }}>
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
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
export default connect(mapStateToProps)(About);