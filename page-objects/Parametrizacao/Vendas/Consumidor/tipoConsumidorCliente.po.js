var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var tipoConsumidorCliente = function () {
    
    var self = this;
    
    this.tConsCli = function () {
        
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '69991180494651088672');
        h.navegar('Tipos de Consumidores');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //clique da api não estava funcionando
        var el = element(by.css('div#NMTIPOCONS'));
        el.click();
        z.widget.grid.click('NMTIPOCONS', j.getValor('consumidor'), '0');
        z.field.fieldFunctions.fill('NMTIPOCONSCLI', 'abc');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.retornaMensagem();
    };
    
    this.editar = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '69991180494651088672');
        h.navegar('Tipos de Consumidores');
        z.widget.grid.click('NMTIPOCONS', j.getValor('consumidor'), '699911802064703292673');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMTIPOCONSCLI', 'abcd');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        // z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.excluir = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '69991180494651088672');
        h.navegar('Tipos de Consumidores');
        z.widget.grid.click('NMTIPOCONS', j.getValor('consumidor'), '699911802064703292673');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
    
}; module.exports = new tipoConsumidorCliente();