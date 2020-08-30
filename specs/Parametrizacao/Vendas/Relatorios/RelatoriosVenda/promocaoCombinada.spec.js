var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var promocao = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/promocaoCombinada.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Promoção Combinada (Sintética)', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Promoção Combinada (Sintético)');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Vendas por Hora (Consolidado)', function () {
        promocao.promocao();
    });


});