module.exports = function(app)  {
    app.get('/',function(req,res){
        var connection = app.infra.connectionFactory();
        var consultasDAO = new app.infra.ConsultasDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            res.render('home/index',{consultas:resultados});
        });
        connection.end();    
    });  
}