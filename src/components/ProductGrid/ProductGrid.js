import React, { Component } from 'react';
import Packery from 'isotope-packery';
import $ from "jquery";

class ProductGrid extends Component {
	constructor(props) {
        super(props);
		this.state = {
			products: []
		};
	}
	componentWillReceiveProps(nextProps){
        console.log('nextProps: ', nextProps);
        this.setState({
        	products: nextProps.products
        });
    }
  	render() {
  		let products = this.state.products;
  		let productGrid;
  		if (products.length > 0) {
  			productGrid = products.map((e, i) => {
  				let imageURL = e.MediumImage[0].URL 
  				return (
  					<div className="product-item" key={i}><img src={imageURL}></img></div>
  				);
  			})
  		}
  		return (
			<div className="product-container">
		  		{products && 
		  			<div className="product-wrapper" ref="searchReact">{productGrid}</div>
		  		}
		    	{!products && 
		  			<div className="product-wrapper">Nothing</div>
		  		}
		  	</div>
  		)
  	}
}

export default ProductGrid;
