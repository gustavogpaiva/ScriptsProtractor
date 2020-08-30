var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var sinteseGeral = function () {

    var self = this;

    this.sinteseFaturamentoGeral = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.calendar.selectIntervalDate('DTENTRVENDA', '01/01/2018', '19/07/2018');

        z.field.fieldFunctions.click('MODALIDADE');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.selectNative.click('TIPORELATORIO', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(7000);
    };
};
module.exports = new sinteseGeral();