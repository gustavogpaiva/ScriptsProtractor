var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

var moment = require('moment');

var manutencaoConta = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    
    this.edicaoConta = function(tipoMov, observacao){
        z.widget.grid.rowExists('IDTIPMOCVLI', tipoMov , '1808152546374891958309').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('IDTIPMOCVLI', tipoMov , '1808152546374891958309')
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('DSATUMOVCLIE', observacao);
            }
        })
    };
    this.filtroTela = function(cliente, consumidor){
        z.component.popup.isOpened().then(function(existePopup){
            if(existePopup){
                z.field.fieldFunctions.click('NMRAZSOCCLIE');
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(1).sendKeys(cliente);
                z.widget.grid.click('NMRAZSOCCLIE', cliente, '9009');
                z.field.fieldFunctions.click('NMCONSUMIDOR');
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(1).sendKeys(consumidor);
                z.widget.grid.click('NMCONSUMIDOR', consumidor, '9009');
                //Função para alteração de data no formato scroll não encontrado
            }
        })
    };
    this.manutencaoConta = function(tipoMov, valor){
        z.component.footer.clickCenterActionByLabel('Adicionar')
        z.field.selectNative.click ('IDTIPMOCVLI', tipoMov); 
        z.field.fieldFunctions.fill('VRMOVCLI',valor);
    };
};
module.exports = new manutencaoConta();