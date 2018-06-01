const express = require('express');
const path = require('path');
const app = express();
const amazon = require('amazon-product-api');
const config = require('./config/credentials.json');
const client = amazon.createClient(config);
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.render('index');
});
app.use(function(req, res, next) { res.header('Access-Control-Allow-Origin', "*"); res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); res.header('Access-Control-Allow-Headers', 'Content-Type'); next();
})
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
app.post('/getAmazonProducts', function (req, res) {
	const keywords = req.body.keyword;
	console.log('keywords: ', keywords);
	client.itemSearch({
	    keywords: keywords,
	    searchIndex: 'All',
	    platform: '',
	    responseGroup: 'ItemAttributes,Offers,Images',
	    domain: 'webservices.amazon.co.uk'
	}, function (err, results) {
	    if (err) {
	        console.log('Amazon Error!', err[0].Error[0].Message[0]);
	        res.status(200).json(err);
	    } else {
			res.status(200).json(results);
	    }
	});
	// res.status(200).json(prods);

});