// THIS USES AN OLD VERSION OF EXPRESS.

// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// SEO done right
app.use(function(req, res, next) {
	var fragment = req.query._escaped_fragment_;

	// If there is no fragment in the query params
	// then we're not serving a crawler
	if(typeof fragment === 'undefined') return next();

	// If the fragment is empty, serve the main page
	if(fragment === '' || fragment === '/') fragment = 'snapshots/index';
	else {
		// If fragment does not start with '/'
		// prepend it to our fragment
		if(fragment.charAt(0) === '/') fragment = 'snapshots' + fragment;
		else fragment = 'snapshots/' + fragment;
	}

	// Supported current SEO views
	var seoViews = ['about', 'careers', 'contact', 'distribution', 'history', 'index', 'partners', 'product', 'services'];

	// Serve the static html snapshot
	if(seoViews.indexOf(fragment.replace('snapshots/', '')) > -1) res.render(fragment, {});
	// If not found, 404
	else res.send(404); // maybe we want this to be next(), depending on if we want to redirect the user to the home page or something
});

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function(req, res) {
  return res.render('index', {});
});

// 404
app.use(function(req, res) {
  return res.send(404);
});

app.listen();