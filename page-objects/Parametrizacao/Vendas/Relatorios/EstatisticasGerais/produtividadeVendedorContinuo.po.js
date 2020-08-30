var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');

var produtividadeVendedorContinuo = function () {

    var self = this;
    var today = moment().format('DD/MM/YYYY');
    var lastYear = moment(today, 'DD/MM/YYYY').subtract(1, "y").format('DD/MM/YYYY');

    this.vendedorProdutividade = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        //z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTMOVTURCAIX', lastYear, today, 'pt_br');
        z.field.fieldFunctions.click('CDVENDEDOR');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtrar');
        browser.sleep('7000');
    };
};
module.exports = new produtividadeVendedorContinuo();