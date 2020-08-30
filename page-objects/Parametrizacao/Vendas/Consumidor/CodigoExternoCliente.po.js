var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var cliente = function () {

    var self = this;

    this.cadastroCodCliente =  function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //clica na unidade
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL',j.getValor('filial'), '0');
        z.field.fieldFunctions.fill('CDEXCLIENTEIMP', '1');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarCodCliente = function () {
        z.widget.grid.click('CDEXCLIENTEIMP', '1', '20391208133195212467288');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('CDEXCLIENTEIMP', '25');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirCodCaixa = function () {
        z.widget.grid.click('CDEXCLIENTEIMP', '25', '20391208133195212467288');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
    };
}
module.exports = new cliente();