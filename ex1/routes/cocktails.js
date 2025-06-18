var express = require('express');
var router = express.Router();

const Cocktail = require('../controllers/cocktail');

/* GET cocktails */
router.get('/cocktails', function(req, res, next) {
    /* Filter by ingredient */
    if (req.query.ingrediente) {
        Cocktail.listByIng(req.query.ingrediente)
        .then(dados => {res.jsonp(dados)})
        .catch(erro => res.status(500).jsonp(erro));
        
        return;
    }

    /* Normal listing */
    Cocktail.list()
        .then(dados => {res.jsonp(dados)})
        .catch(erro => res.status(500).jsonp(erro));
});

/* GET cocktail by id */
router.get('/cocktails/:id', function(req, res, next) {
    Cocktail.findById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
);

/* GET criadores */
router.get('/criadores', function(req, res, next) {
    Cocktail.criadores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET ingredientes */
router.get('/ingredientes', function(req, res, next) {
    Cocktail.ingredientes()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET categorias */
router.get('/categorias', function(req, res, next) {
    Cocktail.categorias()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET criador by id */
router.get('/criadores/:id', function(req, res, next) {
    Cocktail.criadorById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* POST cocktails */
router.post('/cocktails', function(req, res, next) {
Cocktail.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {
    if (erro.message && erro.message.includes('já existe')) {
        res.status(409).jsonp({ error: erro.message });
    } else if (erro.name === 'ValidationError') {
        res.status(400).jsonp({ error: erro.message });
    }
    });
});
  
/* DELETE cocktails */
router.delete('/cocktails/:id', function(req, res, next) {
    Cocktail.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

/* PUT cocktails */
router.put('/cocktails/:id', function(req, res, next) {
    Cocktail.update(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
);

router.get('/criacoes/:id', function(req, res, next) {
    const criador = req.params.id

    Cocktail.cocktailsByCriador(criador)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
