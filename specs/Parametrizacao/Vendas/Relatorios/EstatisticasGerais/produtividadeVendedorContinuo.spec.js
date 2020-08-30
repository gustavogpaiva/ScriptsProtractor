var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var produtividade2 = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedorContinuo.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Produtividade por Vendedor(Continuo)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Produtividade por Vendedor (Contínuo)');
    });

    afterEach(function () {
       h.sairDoSistema();
    });

    it('Produtividade por Vendedor(Continuo)', function () {
        produtividade2.vendedorProdutividade();
    });
});