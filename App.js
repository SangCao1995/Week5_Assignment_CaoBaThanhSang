import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import FeedItem from './components/FeedItem';
import Search from './components/Search';
import {PET} from './utils';
import Publisher from './components/Publisher';

const arr = ['gt', 'gr', 'gh'];

Array.prototype.groupBy = function () {
  return this.reduce(function (groups, item) {
    const val = item['source'];
    const value = val['name'];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    //console.log(groups);
    return groups;
  }, {})
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      listArticles: [],
      totalResults: 0,
      page: 1,
      isLoadMore: false,
      isRefreshing: false,
      isPublisher: false,
      array: [],
      totalResult: 0,
    }
  }
  callApi = async (page) => {
    
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}`);
    await setTimeout(() => {}, 2000);
    const jsonData = await response.json();
    const publisherList = this.state.listArticles.concat(jsonData.articles).groupBy();
    console.log(jsonData);
    this.setState({
      isLoading: false,
      isRefreshing: false,
      listArticles: this.state.listArticles.concat(jsonData.articles),
      totalResults: jsonData.totalResults,
      array: publisherList,
      totalResult: this.state.totalResult + jsonData.articles.length,
    });
  }
  componentDidMount =  async () => {
    this.setState({isLoading: true});
    this.callApi(this.state.page);
  }
  onEndReached = () => {
    const newPage = this.state.page + 1;
    this.setState({page: newPage});
    console.log(newPage);
    this.callApi(newPage);
  }
  renderFooter = () => {
    if(this.state.isRefreshing === false) {
      return <ActivityIndicator size='large' color='red' animating={true}/>
    } 
  }
  onRefresh = async () => {
    const newPage = 1;
    await this.setState({listArticles: [], page: newPage, isRefreshing: true});
    await setTimeout(() => {}, 4000);
    this.callApi(newPage);
  }
  // onPressButton = () => {
  //   const publisherList = this.state.listArticles.groupBy();
  //   //console.log(array);
  //   this.setState({
  //     array: publisherList,
  //     isPublisher: false
  //   })
    
  // }
  goToPublisher = () => {
    this.setState({
      isPublisher: true,
    },
    console.log(this.state.isPublisher))
  }
  render() {
    if (this.state.isPublisher === true) {
      console.log("Hi");
      return <Publisher ListPub={this.state.array} />
    }
    if(this.state.isLoading === true) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='red' animating={this.state.isLoading}/>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.totalArticlesText}>Articles count: {this.state.totalResult} </Text>
          </View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.buttonPublisher} onPress={this.goToPublisher}>
              <Text style={styles.textPublisher}>See publisher</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={this.state.listArticles}
            renderItem={({ item }) => {
              return <FeedItem item={item} />
            }}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter()}
            onRefresh={this.onRefresh}
            refreshing={false}/>
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttonPublisher: {
    marginTop: 5,
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textWrapper: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
  totalArticlesText: {
    color: 'white'
  },
  header: {
    flexDirection: 'row',
    
  },
  button: {
    backgroundColor: 'red',
  },
  textPublisher: {
    padding: 10,
    color: 'white'
  }
});
