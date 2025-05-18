const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const path = require("path")
const webRoutes = require('./routes/webroutes');
const helpers = require("./helpers/handlebarsHelpers");


// Importar o express-handlebars completo, não só o engine
const exphbs = require("express-handlebars");

// Configurar o Handlebars com helpers e layout padrão
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: helpers
});

// Configurações do Express
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Usar rotas
app.use("/", webRoutes);

// Iniciar servidor
app.listen(8081, function () {
    console.log("Servidor ativo em http://localhost:8081");
});
