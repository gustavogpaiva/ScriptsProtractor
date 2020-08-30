var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var parametro = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametroAppConsumidor.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Parametro App. Consumidor', function () {

    beforeEach(function () {
        loginPage.login();
        h.tela('Parâmetros App. Consumidor');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Parâmetro App.Consumidor (Cielo)', function () {
        parametro.cielo();
    });

    it('Parâmetro App.Consumidor (MundiPagg)', function () {
        parametro.mundiPag();
    });

    it('Parâmetro App.Consumidor (Software Express)', function () {
        parametro.softwateExpress();
    });

    //esperar a adição de popup para validação
});