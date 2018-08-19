function ConsultasDAO(connection){
    this._connection = connection;
}

ConsultasDAO.prototype.lista = function(callback){
    this._connection.query('select * from consultas', callback);
}

ConsultasDAO.prototype.salva = function(consulta, callback){
    this._connection.query('insert into consultas set ?', consulta, callback);
}

module.exports = function(){
    return ConsultasDAO;
};

