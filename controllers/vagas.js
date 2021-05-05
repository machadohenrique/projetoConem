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


