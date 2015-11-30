var Flight = require('./models/flight');

function getFlights(res){
	Flight.find(function(err, flights) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(dummy_flights); // return all flights in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all flights
	app.get('/api/flights', function(req, res) {

		// use mongoose to get all flights in the database
		getFlights(res);
	});

	// create flight and send back all flights after creation
	app.post('/api/flights', function(req, res) {

		// create a flight, information comes from AJAX request from Angular
		Flight.create({
			text : req.body.text,
			done : false
		}, function(err, flight) {
			if (err)
				res.send(err);

			// get and return all the flights after you create another
			getFlights(res);
		});

	});

	// delete a flight
	app.delete('/api/flights/:flight_id', function(req, res) {
		Flight.remove({
			_id : req.params.flight_id
		}, function(err, flight) {
			if (err)
				res.send(err);
			getFlights(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
