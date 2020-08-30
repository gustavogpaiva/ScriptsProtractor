var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var obsDesconto = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDesconto/observacaoDesconto.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Observação de Desconto', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Observação de Desconto');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Observação de Desconto', function () {
        obsDesconto.descObs();
    });
});