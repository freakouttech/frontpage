import React, { Component } from 'react';
import {Grid, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSearchValueSuccess } from '../../actions/index';
import ProductGrid from "../../components/ProductGrid";

class Simple extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	value: '',
	  	products: []
	  };

	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	  	this.setState({value: event.target.value});
	  	event.preventDefault();
	}

	handleSubmit(event) {
	  	event.preventDefault();
	  	this.props.getSearchValue(this.state.value);
	  	fetch('http://freakout.tech:8000/getAmazonProducts', {
    		headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
    		},
    		method: 'POST',
    		body: JSON.stringify({ keyword: this.state.value})
		})

        .then(res => { 
        	return res.json()
        })
        .then(products => {
        	this.setState({ products })
        });

	}

  	render() {
	    return (
	      	<div id="wrapper">
	      		<div>
	            	<img onClick={this.handleSubmit} className="hero-logo animated" src="public/img/logo.svg"></img>
	            	<a href="mailto:michael.copeland@freakout.tech" className="text-muted contact-us-link">Contact Us</a>
	            </div>
	            <div>
	            	<input type="search" value={this.state.value} onChange={this.handleChange} name="name" />
	            </div>
	            <ProductGrid products={this.state.products} />
	        </div>
	    );
  	}
}


const mapDispatchToProps = (dispatch) => {
    return {
        getSearchValue: (value) => {
            dispatch(getSearchValueSuccess(value))
        }
    };
};

export default connect(null, mapDispatchToProps)(Simple);
