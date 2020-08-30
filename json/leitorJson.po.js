//importa o módulo fs para leitura do arquivo json
var fs = require('fs');
//importa o módulo path para manipular e transformar caminhos de arquivos
var path = require("path");

//classe responsável pela leitura dos arquivos json
var leitor = function () {
    var self = this;

	//endereço da pasta que contém o arquivo json (deixar na mesma pasta desta classe)
	var jsonFile = ('.' + path.sep + 'json' + path.sep + 'dadosGiraffas.json');
   	console.log(jsonFile);

	//utiliza a função do módulo fs para leitura do arquivo json, com codificação utf8
    var rawdata = fs.readFileSync(jsonFile, 'utf8');

	//recebe e faz um parse dos dados JSON recebidos para um objeto javascript
    var conteudo = JSON.parse(rawdata);

	//retorna do objeto conteudo o valor da chave presente no arquivo JSON
	this.getValor = function(chave){
        return conteudo[chave];
    }; 
};
module.exports = new leitor();