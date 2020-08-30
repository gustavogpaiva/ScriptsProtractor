var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var faturamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryDia.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Faturamento Delivery (Por Dia)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Faturamento Delivery (Por Dia)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Faturamento Delivery (Por Dia)', function () {
        faturamento.fatDelivery();
    });


});