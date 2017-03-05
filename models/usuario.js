var mongoose = require('mongoose')
module.exports = function(app){
	var schema = mongoose.Schema({
		nome:{
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true,
			index:{
				unique: true
			}
		},

		contatos:[{
			type: mongoose.Schema.ObjectId,
			ref: "Usuario"
		}]
	})

	return mongoose.model('Usuario', schema)
}