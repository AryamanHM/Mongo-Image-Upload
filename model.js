var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
	product_name: String,
	quantity: Number,
	seller_name : String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

module.exports = mongoose.model('Products', imageSchema);
