var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var faturamentoHora = function () {

    var self = this;

    this.faturHora = function () {       
        z.field.calendar.selectIntervalDate('DTMOVTURCAIX', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.fieldFunctions.fill('DTHRPEDIDO', '1200');
        z.field.fieldFunctions.fill('DTHRPEDIDOFIM', '1800');
        z.field.selectNative.click('TIPORELATORIO', 'Analítico');
        z.component.footer.clickRightActionByLabel('Filtro');       
    };
};
module.exports = new faturamentoHora();