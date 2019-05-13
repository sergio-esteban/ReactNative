import React, { Component } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
  static navigationOptions = {
    title: 'my Favorites'
  }


  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          color: '#0D19A3',
          backgroundColor: '#15DB95',
          onPress: () => {
            Alert.alert(
              'Delete Favorite?',
              'Are you sure you wish to delete the favorite dish' + item.name + '?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log(item.name + 'Not Deleted'),
                  style: ' cancel'
                },
                {
                  text: 'OK',
                  onPress: () => this.props.deleteFavorite(item.id)
                }
              ],
              { cancelable: false }
            );
          }
        }
      ];

      return (
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate('Dishdetail', { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Swipeout>
      );
    }
    if (this.props.dishes.isLoading) {
      return (
        <Loading />
      );
    }
    else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    }
    else {
      return (
        <FlatList
          //from the list of dishes will get each dish and for each of the dish will examine the favorites array to see if the dish.id exist in the favorites array
          //selecting those dishes that belong in our favorites and then using that as our data for the FlatList
          data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);