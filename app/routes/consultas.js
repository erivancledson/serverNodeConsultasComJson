module.exports = function(app) {

    var listaConsultas = function(req, res) {
        var connection = app.infra.connectionFactory();
        var consultasDAO = new app.infra.ConsultasDAO(connection);

        consultasDAO.lista(function(err, results) {
            res.format({
                html: function() {
                    res.render('consultas/lista', {lista:results});
                },
                json: function() {
                    res.json(results);
                }
            });
        });

        connection.end();
    }

    app.get('/consultas', listaConsultas);
   //para exibir o json
    app.get('/consultas/json', function(req, res) {
        var connection = app.infra.connectionFactory();
        var consultasDAO = new app.infra.ConsultasDAO(connection);

        consultasDAO.lista(function(err, results) {
            res.json(results);
        });

        connection.end();
    });

    app.get('/consultas/form', function(req, res) {
        res.render('consultas/form', {errosValidacao:{}, consulta:{}});
    });

    app.post('/consultas', function(req, res) {
        var consulta = req.body;

        req.assert('medico', 'Nome do médico é obrigatório').notEmpty();
        req.assert('especialidade', 'especialidade é obrigatória').notEmpty();
        req.assert('data', 'data de consulta é obrigatória').notEmpty();
        req.assert('horario', 'horário é obrigatório').notEmpty();
      
      

        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html: function() {
                    res.status(400).render('consultas/form', {errosValidacao:erros, consulta:consulta});
                },
                json: function() {
                    res.status(400).json(erros);
                }
            });

            return;
        }

        //salvar

        var connection = app.infra.connectionFactory();
        var consultasDAO = new app.infra.ConsultasDAO(connection);

        consultasDAO.salva(consulta, function(err, results) {
            res.redirect('/consultas');
        });

        connection.end();
    });
}
