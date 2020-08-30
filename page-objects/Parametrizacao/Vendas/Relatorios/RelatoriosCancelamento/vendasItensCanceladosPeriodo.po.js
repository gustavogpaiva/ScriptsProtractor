var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var itensCancelados = function () {

    var self = this;

    this.cancelaItensPer = function () {

        z.field.fieldFunctions.click('CDFILIAL');
        z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('NMLOJA_V');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDCLIENTE');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDCONSUMIDOR');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDVENDEDOR');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');

        z.component.footer.clickRightActionByLabel('Relatório');
        browser.sleep(7000);
    };
};
module.exports = new itensCancelados();