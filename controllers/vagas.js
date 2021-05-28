const vagasEmprego = require("../database/Vagas");

exports.getListarVagas = (req, res) => {
    vagasEmprego.findAll({
        raw: true, order: [
            ['nomeVaga', 'ASC']
        ]
    })
        .then(arquivos => res.json({
            error: false,
            data: arquivos
        }))
}

exports.getPesquisar = (req, res) => {
    const vagaId = req.params.id;

    vagasEmprego.findOne({
        where: {
            id: vagaId
        }
    }).then(vagas => {
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            if (vagas != undefined) {
                res.statusCode = 200,
                    res.json(vagas)
            } else {
                res.sendStatus(404);
            }
        }
    })
}

exports.postCriarVaga = (req, res) => {
    const { nomeVaga, descricaoVaga, salario, cidade, dataPublicacaoVaga } = req.body;

    vagasEmprego.create({
        nomeVaga: nomeVaga,
        descricaoVaga: descricaoVaga,
        salario: salario,
        cidade: cidade,
        dataPublicacaoVaga: dataPublicacaoVaga

    }).then(status => res.status(201).json({
        error: false,
        menssage: 'Vaga criada com sucesso!'
    }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
}

exports.atualizarVagas = (req, res) => {
    const vagaId = req.params.id;
    const { nomeVaga, descricaoVaga, salario, cidade, dataPublicacaoVaga } = req.body;

    vagasEmprego.update({
        nomeVaga: nomeVaga,
        descricaoVaga: descricaoVaga,
        salario: salario,
        cidade: cidade,
        dataPublicacaoVaga: dataPublicacaoVaga
    }, {
        where: {
            id: vagaId
        }
    })
        .then(vagas => res.status(201).json({
            error: false,
            menssage: 'Vaga atualizada com sucesso'
        }))

        .catch(error => res.json({
            error: true,
            error: error
        }))
}

exports.deletarVagas = (req, res) => {
    const vagasId = req.params.id;

    vagasEmprego.destroy({
        where: {
            id: vagasId
        }
    }).then(status => res.status(200).json({
        error: false,
        menssage: 'A vaga foi deletada com sucesso!'
    }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
}

