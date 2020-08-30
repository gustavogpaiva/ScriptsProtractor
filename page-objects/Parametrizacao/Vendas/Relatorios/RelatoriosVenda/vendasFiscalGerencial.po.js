var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var vendasFiscalGerencial = function () {

    var self = this;

    this.vendasFiscal = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('5000');
    };
};
module.exports = new vendasFiscalGerencial();