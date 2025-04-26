const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const helpers = require("./helpers/handlebarsHelpers");

// Sessão
app.use(session({
    secret: "secreto123",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
const hbs = handlebars.create({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: helpers
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
const webRoutes = require("./routes/WebRoutes");
app.use("/", webRoutes);

// Servidor
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Servidor ativo na porta http://localhost:${PORT}/`);
});
