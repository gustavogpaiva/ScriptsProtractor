var fs = require('fs');
var path = require("path");

var leitor = function () {
    var self = this;
    var jsonFile = ('.' + path.sep + 'json' + path.sep + 'teste.json');
    console.log(jsonFile);
    var rawdata = fs.readFileSync(jsonFile, 'utf8');
    var conteudo = JSON.parse(rawdata);
    
    this.getValor = function(chave){
        return conteudo[chave];
    };  
};
module.exports = new leitor();