const bcrypt = require("bcrypt");
const Administrador = require("../database/Administrador");
const jwt = require("jsonwebtoken");

exports.postLoginAdministrador = (req, res) => {
    const { email, senha } = req.body;

    Administrador.findOne({ where: { email: email } }).then(admin => {
        if (admin) {
            bcrypt.compare(senha, admin.senha, function (err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                admin.senha = undefined;
                if (result) {
                    let token = jwt.sign({ nome: admin.nome }, "verySecretValue", { expiresIn: '1h' })
                    res.json({
                        message: 'Login efetuado com sucesso',
                        admin,
                        token
                    })
                } else {
                    res.json({
                        message: 'A senha não corresponde'
                    })
                }
            })
        } else {
            res.json({
                message: 'Administrador não encontrado!'
            })
        }
    })
}


exports.postCriarAdministrador = (req, res, next) => {
    const { nome, email, senha } = req.body;

    Administrador.findOne({ where: { email: email } }).then(administradores => {
        if (administradores == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, salt);

            Administrador.create({
                nome: nome,
                email: email,
                senha: hash
            }).then(status => res.status(201).json({
                error: false,
                menssage: 'Cadastro efetuado com sucesso!'
            }))
                .catch(error => res.json({
                    error: true,
                    error: error
                }))
        } else {
            res.sendStatus(404);
        }
    })
}
