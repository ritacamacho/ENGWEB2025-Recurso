const mongoose = require('mongoose');
var Cocktail = require('../models/cocktail');

module.exports.list = () => {
    return Cocktail.find().select('_id nome categoria criador').exec();
};

module.exports.listByIng = (ingrediente) => {
  return Cocktail.find({
    ingredientes: ingrediente
  })
  .select('_id nome ingredientes')
  .exec();
};

module.exports.findById = (id) => {
    return Cocktail.findOne({ _id: id }).exec();
}

module.exports.criadores = () => {
  return Cocktail.aggregate([
    { $match: { criador: { $ne: null } } },
    {
      $group: {
        _id: "$criador.id",
        criador: { $first: "$criador" },
        cocktails: { $push: "$nome" }
      }
    },
    {
      $project: {
        _id: 0,
        criador: 1,
        cocktails: 1
      }
    },
    { $sort: { "criador.nome": 1 } }
  ]).exec();
};

module.exports.ingredientes = () => {
  return Cocktail.aggregate([
    { $unwind: "$ingredientes" },
    {
      $group: {
        _id: "$ingredientes",
        cocktails: { $push: "$nome" }
      }
    },
    {
      $project: {
        _id: 0,
        ingrediente: "$_id",
        cocktails: 1
      }
    },
    { $sort: { ingrediente: 1 } }
  ]).exec();
};

module.exports.categorias = () => {
  return Cocktail.aggregate([
    { $match: { categoria: { $ne: null } } },
    {
      $group: {
        _id: "$categoria",
        cocktails: { $push: "$nome" }
      }
    },
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        cocktails: 1
      }
    },
    { $sort: { categoria: 1 } }
  ]).exec();
};

module.exports.criadorById = (id) => {
  return Cocktail.aggregate([
    { $match: { "criador.id": id } },
    {
      $group: {
        _id: "$criador.id",
        criador: { $first: "$criador" },
        cocktails: { $push: "$nome" }
      }
    },
    {
      $project: {
        _id: 0,
        criador: 1,
        cocktails: 1
      }
    }
  ]).exec();
};

module.exports.cocktailsByCriador = (criador) => {
  return Cocktail.find({ "criador.id": criador })
    .select("_id nome categoria ingredientes")
    .exec();
};

module.exports.insert = async (cocktail) => {
    const existsById = await Cocktail.find({ _id: cocktail._id }).exec();

    if (existsById.length === 0) {
        const newCocktail = new Cocktail(cocktail);
        return newCocktail.save();
    }

    console.log("[ERROR] Cocktail já existe.");
    return Promise.reject(new Error('Cocktail já existe.'));
}
  
module.exports.remove = (id) => {
    return Cocktail.find({ _id: id }).deleteOne().exec();
}

module.exports.update = (id, cocktail) => {
    return Cocktail.findByIdAndUpdate(id, cocktail, { new: true }).exec();
}

