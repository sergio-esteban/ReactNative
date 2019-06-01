import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
// import { DISHES } from '../shared/dishes'; //that will be obtained from my redux store
// import { COMMENTS } from '../shared/comments';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(postComment(comment)),
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});


function RenderDish(props) {

  const dish = props.dish;

  handleViewRef = ref => this.view = ref;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    } else {
      return false;
    }
  }

  const recognizeComment = ({ dx }) => {
    if (dx > 200) {
      return true;
    }
    return false;
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view.rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add to Favorites?',
          'Are you sure you wish to add' + dish.name + ' to you favorite?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'

            },
            {
              text: 'OK',
              onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
            }
          ],
          { cancelable: false }
        )
      } else if (recognizeComment(gestureState)) {
        props.toggleModal();
      }
      return true;
    }
  })

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers} >
        <Card
          featuredTitle={dish.name}
          image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>
            {dish.description}
          </Text>
          <View style={styles.centralButtons}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
              type='font-awesome'
              color='#0D19A3'
            />
            <Icon
              reverse
              name='pencil'
              onPress={() => props.toggleModal()}
              type='font-awesome'
              color='#15DB95'
            />
          </View>
        </Card >
      </Animatable.View>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComments(props) {
  const comments = props.comments

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating readonly={true} imageSize={10} startingValue={item.rating} />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}
        </Text>
      </View>
    )
  }

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );

}

const RenderModal = ({
  showModal,
  toggleModal,
  addComment,
  dishId,
  setRating,
  setAuthor,
  setComment
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={showModal}
      onDismiss={() => toggleModal()}
      onRequestClose={() => toggleModal()}
    >
      <View style={styles.modal}>
        <Rating
          showRating
          fractions={1}
          startingValue={5.0}
          onFinishRating={rating => {
            setRating(rating)
          }}
        />
        <View style={styles.formRow}>
          <Input
            label='Author'
            onChangeText={author => {
              setAuthor(author)
            }}
            // placeholder=" Author"
            leftIcon={
              <Icon
                name='user'
                size={24}
                type='font-awesome'
                color='#D3D3D3'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label='Comment'
            onChangeText={comment => {
              setComment(comment)
            }}
            shake={true}
            errorStyle={{ color: 'red' }}
            // errorMessage='ENTER A VALID NAME HERE'
            // placeholder=" Comment"
            leftIcon={
              <Icon
                name='comment'
                size={24}
                type='font-awesome'
                color='#D3D3D3'
              />
            }
            leftIconContainerStyle={{
              paddingRight: 20,
            }}
          />
        </View>
        <View style={styles.modalButtons}>
          <Button
            onPress={() => {
              addComment(dishId)
              toggleModal()
            }}
            color="#0D19A3"
            title="Submit"
          />
          <Button
            onPress={() => {
              toggleModal()
            }}
            color="#A9A9A9"
            title="Cancel"
          />
        </View>
      </View>
    </Modal>
  )
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      author: '',
      comment: '',
      rating: 5,
      showModal: false,
      lastCommentId: props.comments.comments.length - 1
    }
  }

  static navigationOptions = {
    title: 'Dish details',
  };


  markFavorite(dishId) {
    // this.setState({
    //   favorites: this.state.favorites.concat(dishId)
    // })
    this.props.postFavorite(dishId);
  }

  addComment = dishId => {
    this.props.postComment({
      dishId: dishId,
      lastCommentId: this.state.lastCommentId,
      rating: this.state.rating,
      author: this.state.author,
      comment: this.state.comment
    })
    this.setState({
      lastCommentId: this.state.lastCommentId + 1
    })
  }

  setComment = comment => {
    this.setState({
      comment: comment
    })
  }

  setAuthor = author => {
    this.setState({
      author: author
    })
  }

  setRating = rating => {
    this.setState({
      rating: rating
    })
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    console.log(this.state)
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={this.toggleModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)}
        />
        <RenderModal
          dishId={dishId}
          toggleModal={this.toggleModal}
          showModal={this.state.showModal}
          setComment={this.setComment}
          setAuthor={this.setAuthor}
          setRating={this.setRating}
          addComment={this.addComment}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    // // alignItems: 'center',
    // // justifyContent: 'center',
    // flex: 1,
    // flexDirection: 'row',
    marginTop: 20,
    // // backgroundColor: 'transparent',
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1,
    color: '#0D19A3',
    padding: 20,
    height: 50,
    width: 100
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#0D19A3',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  centralButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  modalButtons: {
    marginTop: 40
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);