var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var maisVendidos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/produtosMaisVendidos.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Produtos Mais Vendidos', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Produtos Mais Vendidos');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Produtos Mais Vendidos', function () {
        maisVendidos.prodMaisVendidos();
    });
});