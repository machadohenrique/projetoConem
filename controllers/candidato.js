const Candidato = require("../database/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postCandidatoLogin = (req, res, next) => {
    const { email, senha } = req.body;

    Candidato.findOne({ where: { email: email } }).then(candidato => {
        if (candidato) {
            bcrypt.compare(senha, candidato.senha, function (err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                candidato.senha = undefined;
                if (result) {
                    let token = jwt.sign({ nome: candidato.nome }, "verySecretValue", { expiresIn: '1h' })
                    res.json({
                        message: 'Login efetuado com sucesso',
                        candidato,
                        token
                    })
                } else {
                    res.json({
                        menssage: 'A senha não corresponde'
                    })
                }
            })
        } else {
            res.json({
                menssage: 'Nenhum candidato encontrado!'
            })
        }
    })
}

exports.postCadastroUsuario = (req, res, next) => {
    const { nome, email, senha } = req.body;
    const filePath = `${req.file.destination}/${req.file.filename}`

    Candidato.findOne({ where: { email: email } }).then(candidatos => {
        if (candidatos == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, salt);

            Candidato.create({
                nome: nome,
                email: email,
                senha: hash,
                filePath: filePath
            }).then(status => res.status(201).json({
                error: false,
                menssage: 'Cadastro efetuado com sucesso!'
            }))
                .catch(error => res.json({
                    error: true,
                    error: error
                }))
        } else {
            res.status(409).json({
                menssage: "Este candidato já possui um cadastro."
            });
        }
    })
}


exports.atualizarCadastroCandidato = (req, res) => {
    const candidatoId = req.params.id;
    const { nome, email, senha } = req.body;
    const filePath = `${req.file.destination}/${req.file.filename}`

    if (isNaN(candidatoId)) {
        res.sendStatus(400)
    } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);
        Candidato.update({
            nome: nome,
            email: email,
            senha: hash,
            filePath: filePath
        }, {
            where: {
                id: candidatoId
            }
        }).then(() => {
            Candidato.findOne({
                where: {
                    id: candidatoId
                }
            }).then(candidatos => {
                candidatos.senha = undefined;
                res.statusCode = 200,
                    res.json({
                        candidatos,
                        menssage: 'Perfil atualizado com sucesso'
                    });
            })
        })
    }
}

/*
app.delete("/candidatoDelete/:id", (req, res) => {
    const candidatoId = req.params.id;
    Candidato.destroy({
        where: {
            id: candidatoId
        }
    })
        .then(status => res.status(201).json({
            error: false,
            menssage: 'Candidato deletado com sucesso'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
})
*/



