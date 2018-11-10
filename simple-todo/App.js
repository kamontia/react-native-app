import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';

export default class App extends Component {
  constructor () {
    super ();
    this.state = {
      threds: [],
      isLoading: true,
    };
  }

  componentDidMount () {
    fetch ('https:/www.reddit.com/r/newsokur/hot.json')
      .then (response => response.json ())
      .then (responseJson => {
        let threds = responseJson.data.children;
        threds = threds.map (i => {
          i.key = i.data.url;
          return i;
        });
        this.setState ({
          threds: threds,
          isLoading: false,
        });
      })
      .catch (error => {
        console.error (error);
      });
  }

  render () {
    const {threds, isLoading} = this.state;
    const {width} = Dimensions.get ('window');
    console.log (width);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          aligenItems: 'center',
        }}
      >
        {isLoading
          ? <ActivityIndicator />
          : <SwipeListView
              useFlatList
              data={this.state.threds}
              renderItem={({item}, rowMap) => {
                return (
                  <View style={styles.rowFront}>
                  <Text
                    style={{
                      width: width,
                      height: 50
                    }}
                  >
                    {item.data.title}
                  </Text> 
                  </View>
                );
              }}
              renderHiddenItem={({item}, rowMap) => {
                return (
                  <View style={styles.rowBack}>
                    <Text>Done</Text>
                    <Text>Delete</Text>
                  </View>
                );
              }
            }
              leftOpenValue={75}
              rightOpenValue={-75}

            />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	}
});