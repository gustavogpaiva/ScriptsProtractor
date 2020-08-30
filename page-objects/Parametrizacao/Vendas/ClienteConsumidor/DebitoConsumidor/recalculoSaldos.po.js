var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');


var calSaldos = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    
    this.calcularSaldos = function () {
        // filial ainda possui autocomplete
        // z.field.fieldFunctions.click('NMFILIAL');
        // z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        // cliente
        z.field.fieldFunctions.click('NMFANTCLIE');
        z.widget.grid.click('NMFANTCLIE', j.getValor('cliente'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        // Informa Consumidor checkbox
        z.field.checkbox.click('INFORMACONS');
        // data
        z.field.fieldFunctions.click('DTRECALCULO');
        z.field.calendar.selectDate(today, 'pt_br');
        // Tipo de Consumidor/Cliente
        z.field.fieldFunctions.click('NMTIPOCONS');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        // Consumidor
        z.field.fieldFunctions.click('NMCONSUMIDOR');
        // z.util.pressKey( j.getValor('nomeConsumidor'));
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Recalcular');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
    
    this.calculaBranco = function () {
        var el = element.all(by.css('#NMFILIAL > span.ng-scope.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
        el.click();
        var data = element.all(by.css('#DTRECALCULO > span.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
        data.click()
        z.component.footer.clickRightActionByLabel('Recalcular');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};
module.exports = new calSaldos();