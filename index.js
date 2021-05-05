const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const connection = require("./database/data");
const multer = require("multer");
//const candidato = require("./database/Usuario");
//const vagasEmprego = require("./database/Vagas");

const candidatoController = require('./controllers/candidato');
const vagasController = require('./controllers/vagas');
const administradorController = require("./controllers/administrador");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({});
    }
    next();
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);

    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter

})

app.post("/candidatoCadastro", upload.single('arquivo'), candidatoController.postCadastroUsuario);
app.post("/administradorCadastro", administradorController.postCriarAdministrador);
app.put("/atualizarCadastroCandidato/:id", candidatoController.atualizarCadastroCandidato);

app.post("/cadastroVagas", administradorController.postCriarVaga);
app.get("/pesquisar/:id", vagasController.getPesquisar);
app.get("/listarVagas", vagasController.getListarVagas);
app.delete("/deletarVagas/:id", administradorController.deletarVagas);
app.put("/atualizaVaga/:id", administradorController.atualizarVagas);




app.listen(process.env.PORT || 8080, () => {
    console.log("API RODANDO!")
})

