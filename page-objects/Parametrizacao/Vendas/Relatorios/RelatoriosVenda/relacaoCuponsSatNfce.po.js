var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var relacaoCupons = function () {

    var self = this;

    this.relatorio = function () {
        z.field.fieldFunctions.click('CDFILICAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.selectNative.click('IDTPAMBNFCE', 'Homologação');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('7000');

    };
};
module.exports = new relacaoCupons();