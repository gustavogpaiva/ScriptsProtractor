var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');

var venHora = function () {

    var self = this;

    this.vendaHora = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'),'0');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.fill('MINUTOS', '1234');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.fieldFunctions.fill('HRINI', '1200');
        z.field.fieldFunctions.fill('HRFIN', '1800');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('3000');
    };
};
module.exports = new venHora();