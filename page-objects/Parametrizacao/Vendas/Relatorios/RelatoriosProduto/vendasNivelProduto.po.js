var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var vendasNivelProd = function () {

    var self = this;

    this.vendasNivelProd = function () {
        z.field.fieldFunctions.click('CDFILIAL');
         z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTMOVIMENTO', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.fieldFunctions.click('CDCLIENTE');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCONSUMIDOR');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.selectNative.click('CDNVPRODUTO', '1');       
        z.field.selectNative.click('TIPORELATORIO', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('3000');
    };


};
module.exports = new vendasNivelProd();