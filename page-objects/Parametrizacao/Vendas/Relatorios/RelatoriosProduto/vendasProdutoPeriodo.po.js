var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var vendasProdutoPeriodo = function () {

    var self = this;

    this.vendProdPeriodo = function () {
        z.field.fieldFunctions.click('CDFILIAL');
         z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDFILICAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.selectNative.click('TIPORELATORIO', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('7000');
    };
};
module.exports = new vendasProdutoPeriodo();