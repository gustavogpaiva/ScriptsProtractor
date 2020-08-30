var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');


var manutencaoConta = function () {

    var self = this;
    //refazer essa tela
    this.contaManutencao = function () {
        //Quando clico em ações/transferência de saldo está faltando o botão de transferir o saldo
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente') , '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONSUMIDOR', 'Tek', '1129274180489907095475');
        h.navegar('Família de Produto por Consumidor');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('CDFAMILISALD');
        z.widget.grid.click('CDFAMILISALD', '')
        z.field.fieldFunctions.fill('VRSALDCONFAM', '1234'); 
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
};
module.exports = new manutencaoConta();