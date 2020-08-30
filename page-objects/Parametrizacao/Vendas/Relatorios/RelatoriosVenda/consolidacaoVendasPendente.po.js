var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var consolidacaoVendasPendente = function () {

    var self = this;

    this.consolidacaoVendas = function () {
        /* z.util.clickElement(by.css('body > span > section > section > div.default-window.ng-scope > section.everything.ng-scope > div > section > section:nth-child(1) > aside > section.right-side > a')); usar quando o filtro não abrir*/
        z.field.fieldFunctions.click('CDFILIAL');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('5000');
    };
};
module.exports = new consolidacaoVendasPendente();