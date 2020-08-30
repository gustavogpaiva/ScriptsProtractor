var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var cupomPendente = function () {

    var self = this;

    this.fechamento = function () {
        //função para corrigir a ausência de filtro automatico
        z.util.clickElement(by.css('body > span > section > section > div.default-window.ng-scope > section.everything.ng-scope > div > section > section:nth-child(1) > aside > section.right-side > a'));
        z.field.fieldFunctions.click('CDFILIAL');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.selectNative.click('IDSTATUS', 'Pendente');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('3000');
    };
};
module.exports = new cupomPendente();