var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendaHora = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasHora.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas por Hora (Consolidado)', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Vendas por Hora (Consolidado)');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Vendas por Hora (Consolidado)', function () {
        vendaHora.vendaHora();
    });


});