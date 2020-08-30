var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var cancelamentoItens = function () {

    var self = this;

    this.cancelaItens = function () {

        z.field.fieldFunctions.click('CDFILIAL');
        //z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '0');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('GARCON');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');

        z.field.fieldFunctions.click('IDPRODPRODUZC');
        //z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.selectNative.click('TIPORELATORIO', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(7000);
    };


};
module.exports = new cancelamentoItens();