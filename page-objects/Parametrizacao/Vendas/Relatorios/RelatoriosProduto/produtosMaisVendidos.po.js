var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var produtosMaisVendidos = function () {

    var self = this;

    this.prodMaisVendidos = function () {
        z.field.fieldFunctions.click('CDFILIAL');
         z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.selectNative.click('IDTIPORELATORIO', 'Valor/Loja');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(3000);
    };
};
module.exports = new produtosMaisVendidos();