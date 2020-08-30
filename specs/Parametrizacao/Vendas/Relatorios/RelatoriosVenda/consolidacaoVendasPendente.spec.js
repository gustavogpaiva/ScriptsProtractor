var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasFiscalGerencial.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas Fiscais X Gerenciais', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas Fiscal X Gerencial');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas Fiscais X Gerenciais', function () {
        vendas.vendasFiscal();
    });


});