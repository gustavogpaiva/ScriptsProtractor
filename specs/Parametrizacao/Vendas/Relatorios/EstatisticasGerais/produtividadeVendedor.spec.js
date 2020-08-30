var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var produtividadeVendedor = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedor.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Produtividade por Vendedor', function () {

    //executa o login o sistema
    beforeEach(function () { 
        loginPage.login();
        h.tela('Produtividade por Vendedor')
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Produtividade por Vendedor', function () {
        produtividadeVendedor.vendedorProdutividade();
    });
});