var mongoose = require('mongoose');

module.exports = mongoose.model('Flight', {
	dest: String, price: Number
});
