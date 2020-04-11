const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, min: 6},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	date: {type: Date, required: true},
	friends: [{type: Types.ObjectId, ref: 'Friend'}]
})

module.exports = model('User', schema)