var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');

var vendasImposto = function () {

    var self = this;

    this.vendasFiscal = function () {
        z.field.selectNative.click('IDRELATORIOFIELD', 'Imposto por Produto (Total Imposto)');
       
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDIMPOSTO');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.fieldFunctions.click('NMPRODUTOI');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('5000');
    };
};
module.exports = new vendasImposto();