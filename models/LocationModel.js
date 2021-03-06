const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const version = require('mongoose-version');

const locationSchema = new Schema({
  address: String,
  name: String,
  city: String,
  state: String,
  zipcode: String,
  contact: String,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  phone: String,
  note: String
}, { timestamps: true });

locationSchema.plugin(version, { collection: 'locations__versions' });

module.exports = mongoose.model('location', locationSchema);
