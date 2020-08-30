var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');

var cancelamentoServicos = function () {

    var self = this;

    this.cancelaServicos = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');

        z.field.fieldFunctions.click('GARCON');
        z.widget.grid.checkAllRows('9999');
        
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('7000');
    };
};
module.exports = new cancelamentoServicos();