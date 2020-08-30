var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');

var relTabPreco = function () {

    var self = this;

    this.rTP = function () {

        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.field.fieldFunctions.click('NMTABEPREC');
        z.widget.grid.click('NMTABEPREC', j.getValor('tabelaDePreco'), '0');
        z.field.fieldFunctions.click('LABELDTVIGENCIA');
        z.widget.grid.click('LABELDTVIGENCIA', 'De 01/01/2020 até 01/01/2020', '0');
        z.field.fieldFunctions.click('PRODINI');
        z.util.pressKey(j.getValor('produto2'));
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(7000);
    };
};
module.exports = new relTabPreco();