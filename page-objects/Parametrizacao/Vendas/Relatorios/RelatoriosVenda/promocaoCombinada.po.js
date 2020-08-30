var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');

var promocaoCombinada = function () {

    var self = this;

    this.promocao = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('P_PRODINI');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('3000');
    };
};
module.exports = new promocaoCombinada();