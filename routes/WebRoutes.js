const express = require("express");
const router = express.Router();
const post = require("../models/post");

// Página principal
router.get("/", (req, res) => {
    res.render("index");
});

// Página de listagem de posts
router.get('/consultar', function (req, res) {
    post.findAll().then((posts) => {
        res.render('consultar', { posts: posts });
    }).catch((erro) => {
        res.send('Erro ao consultar os posts: ' + erro);
    })
});

// Página de cadastro (formulário)
router.get("/cadastrar", (req, res) => {
    res.render("cadastrar", { mensagem: console.log("mensagem") });
});

// Processar cadastro
router.post("/cadastrar", (req, res) => {
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        origem: req.body.origem,
        dataContato: req.body.datCont,
        observacao: req.body.observ
    })
        .then(() => {
            console.log("mensagem", "Dados enviados com sucesso!");
            res.redirect("/consultar");
        })
        .catch(erro => {
            console.log("mensagem", "Falha ao cadastrar os dados: " + erro);
            res.redirect("/consultar");
        });
});



// Página de edição
router.get('/editar/:id', function (req, res) {
    post.findOne({ where: { 'id': req.params.id } }).then((posts) => {
        res.render('editar', { posts: [{ dataValues: posts.dataValues }] });
    }).catch((erro) => {
        res.send('Erro ao consultar o post: ' + erro);
    });
});

// Processar atualização
router.post("/editar/:id", function (req, res) {
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        origem: req.body.origem,
        dataContato: req.body.datCont,
        observacao: req.body.observ
    }, {
        where: { id: req.params.id }
    })
        .then(() => {
            console.log("mensagem", "Dados atualizados com sucesso!");
            res.redirect("/consultar");
        })
        .catch(erro => {
            console.log("mensagem", "Falha ao atualizar os dados: " + erro);
            res.redirect("/consultar");
        });
});

// Página de exclusão
router.get("/excluir/:id", function (req, res) {
    post.destroy({ where: { id: req.params.id } })
        .then(() => res.redirect("/consultar"))
        .catch(erro => res.send("Erro ao excluir post: " + erro));
});

module.exports = router;