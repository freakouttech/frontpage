import React, { Component } from 'react';
import Cookies from 'cookies-js';
import { Switch, Route, Redirect } from 'react-router-dom'
import io from 'socket.io-client';
// import { pingEvent, setProducts, emptyScrape, updateUser, setChart, getChart } from './../../actions/socket/index';
import { connect } from 'react-redux';


class SocketLibrary extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect('http://sti.kout.io:3001/',{
        query:{
          token: Cookies.get('jwtToken')
        }
    });
    this.state = {
    	products: [],
      user: props.user,
      scrape: props.scrape,
      pagination: {
        offset:0,
        limit:25
      },
      searchValue: {
        search: ""
      },
      action: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      scrape: nextProps.scrape,
      pagination: nextProps.pagination,
      searchValue: nextProps.searchValue,
      action: nextProps.action,
      chartData: nextProps.chartData,
      setChartData: nextProps.setChartData,
    });
  }
  componentDidMount() {
  	const { dispatch } = this.props;
    this.socket
    .on('productCount', m => {
      console.log('socket received productCount ',m);
      dispatch(pingEvent(m));
    })
    .on('big-dicks', notification => {
      console.log('socket received notif ',notification);
    })
    .on('log', log => {
      console.log('socket received log ',log);
    })
    .on('products',  data => {
      dispatch(setProducts(data));
    })
    .on('updateUser',  data => {
      dispatch(updateUser(data));
    })
    .on('setChart', data => {
      console.log('setChart: ', data);
      dispatch(setChart(data));
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.scrape !== '') {
      this.scrape();
    }
    switch (this.state.action) {
      case 'get_products':
          this.getMoreProducts();
          return;
      case 'set_search':
          this.getMoreProducts();
          return;
      case 'set_chart':
          return;
      case 'get_chart':
          this.getChartData();
          return;
      default:
          return ;
    }
  }

  getChartData = () => {
    console.log('getChart', this.state.setChartData);
    this.socket.emit('saveChart', this.state.setChartData);
  }

  scrape = () => {
    this.socket.emit('scrape', this.state.scrape);
    this.props.dispatch(emptyScrape(this.state.scrape));
    this.setState({
      scrape: ''
    });
  }

  getMoreProducts = () => {
    const query = JSON.parse(JSON.stringify(this.state.searchValue)) || {};
    const pagination = this.state.pagination;
    this.socket.emit('products', {query, pagination});
  }

  render() {
    return <div className="full-container">{this.props.children}</div>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    scrape: state.STI.scrape,
    pagination: state.STI.pagination,
    searchValue: state.STI.searchValue,
    action: state.STI.action,
    chartData: state.STI.chartData,
    setChartData: state.STI.setChartData
  };
}

export default connect(mapStateToProps, null)(SocketLibrary);
