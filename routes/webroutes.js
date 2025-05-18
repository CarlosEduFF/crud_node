// webroutes.js
const express = require("express")
const router = express.Router()
const db = require("../firebase/firebase")


// Rota principal
router.get("/", function (req, res) {
    res.render("index")
})


// Listar agendamentos
router.get("/consultar", async function (req, res) {
    const snapshot = await db.collection('agendamentos').get()
    const agendamentos = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    res.render("consultar", { agendamentos });
});


// Formulário de edição
router.get("/editar/:id", async function (req, res) {
    try {
        const doc = await db.collection('agendamentos').doc(req.params.id).get();
        if (!doc.exists) {
            return res.send("Documento não encontrado.");
        }
        // Estrutura compatível com {{#each posts}}{{#dataValues}}...{{/dataValues}}{{/each}}
        res.render("editar", {
            posts: [
                {
                    dataValues: {
                        id: doc.id,
                        ...doc.data()
                    }
                }
            ]
        });
    } catch (error) {
        console.error("Erro ao buscar documento:", error);
        res.status(500).send("Erro interno no servidor.");
    }
});

router.post("/editar/:id", async function (req, res) {
    try {
        const id = req.params.id;

        // Dados vindos do formulário
        const { nome, telefone, email, origem, datCont, observ } = req.body;

        // Atualiza o documento no Firestore
        await db.collection("agendamentos").doc(id).update({
            nome,
            telefone,
            email,
            origem,
            dataContato: datCont,
            observacao: observ
        });

        // Redireciona com mensagem
        res.render("editar", {
            mensagem: "Consulta atualizada com sucesso!",
            posts: [
                {
                    dataValues: {
                        id,
                        nome,
                        telefone,
                        email,
                        origem,
                        dataContato: datCont,
                        observacao: observ
                    }
                }
            ]
        });
    } catch (error) {
        console.error("Erro ao editar consulta:", error);
        res.status(500).send("Erro ao atualizar a consulta.");
    }
});



// Deletar agendamento
router.get("/excluir/:id", async function (req, res) {
    await db.collection('agendamentos').doc(req.params.id).delete()
    res.redirect("/consultar")
})

// Cadastrar novo agendamento
router.get("/cadastrar", function (req, res) {
    res.render("cadastrar")
})
router.post("/cadastrar", async function (req, res) {
    console.log('req.body:', req.body);
    await db.collection('agendamentos').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        origem: req.body.origem,
        dataContato: req.body.data_contato || null,
        observacao: req.body.observacao || null
    })
    res.redirect("/")
})

// Atualizar agendamento
router.post("/atualizar", async function (req, res) {
    await db.collection('agendamentos').doc(req.body.id).update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    })
    res.redirect("/consulta")
})

module.exports = router;

