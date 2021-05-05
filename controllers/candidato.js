const candidato = require("../database/Usuario");
const bcrypt = require("bcrypt");

exports.postCadastroUsuario = (req, res, next) => {
    const { nome, email, senha } = req.body;
    const filePath = `${req.file.destination}/${req.file.filename}`

    candidato.findOne({ where: { email: email } }).then(candidatos => {
        if (candidatos == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, salt);

            candidato.create({
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
            res.sendStatus(404);
        }
    })
}


exports.atualizarCadastroCandidato = (req, res) => {
    const candidatoId = req.params.id;
    const { nome, email, senha } = req.body;

    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);
        candidato.update({
            nome: nome,
            email: email,
            senha: hash
        }, {
            where: {
                id: candidatoId
            }
        }).then(() => {
            candidato.findOne({
                where: {
                    id: candidatoId
                }
            }).then(candidatos => {
                if (candidatos == undefined) {
                    res.status(404).json({
                        menssage: 'Não existe perfil com este Id'
                    });
                } else {
                    res.status(201).json({
                        error: false,
                        menssage: 'Perfil atualizado com sucesso'
                    })
                }
            })
        })
    }
}





