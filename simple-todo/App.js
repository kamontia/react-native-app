import React, {Component} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

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
          : <FlatList
              data={threds}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      width: '100%',
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={{
                        uri: item.data.thumbnail,
                      }}
                    />

                    <View
                      style={{
                        width: width - 50,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            width: width - 50,
                          }}
                        >
                          {item.data.title}
                        </Text>
                        <Text
                          style={{
                            color: '#ababab',
                            fontSize: 10,
                          }}
                        >
                          {item.data.domain}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />}
      </View>
    );
  }
}
