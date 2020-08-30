var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);

var producaoKDS = function () {
    var self = this;

    this.emitirRelatorio = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDPRODUTO');
        z.util.pressKey(' alca');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '01/01/2018', '19/07/2018');
        z.field.fieldFunctions.click('CDSETOR');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.selectNative.click('Analítico', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('7000');
    };
};
module.exports = new producaoKDS();