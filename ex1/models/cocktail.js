const mongoose = require('mongoose');

const criadorSchema = new mongoose.Schema({
  id: String,
  nome: String
}, { _id: false });

const cocktailSchema = new mongoose.Schema({
  _id: String,
  nome: String,
  foto: { type: String, default: null },
  categoria: { type: String, default: null },
  servidoEm: { type: String, default: null },
  preparacao: String,
  ingredientes: [String],
  criador: { type: criadorSchema, default: null }
}, { versionKey: false });

module.exports = mongoose.model('cocktails', cocktailSchema);