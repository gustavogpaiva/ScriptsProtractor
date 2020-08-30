var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var testeCartaoFidelidade = function () {

    var self = this;

    this.cartaoFidelidade = function () {
        z.field.fieldFunctions.fill('CARTAOINI', '000000001');
        z.field.fieldFunctions.fill('CARTAOFIM', '000000020');
        z.field.fieldFunctions.fill('EMAIL', 'pedro.nascimento@teknisa.com');
        z.component.footer.clickRightActionByLabel('Enviar email');
        element(by.css('#CONTENT')).getText().then(function (resultado) {
            console.log('resultado = ' + resultado);
        });
        browser.sleep('3000');
        z.component.footer.clickLeftActionByLabel('Cancelar');
    };
};
module.exports = new testeCartaoFidelidade();