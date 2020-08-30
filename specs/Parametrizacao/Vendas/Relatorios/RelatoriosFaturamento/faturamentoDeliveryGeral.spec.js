var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var faturamentoGeral = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryGeral.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Faturamento Delivery (Geral)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Faturamento Delivery (Geral)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Faturamento Delivery (Geral)', function () {
        faturamentoGeral.fatDeliveryGeral();
    });
});