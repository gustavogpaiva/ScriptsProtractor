var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var relatorioPreco = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosPreco/relatorioTabelaPreco.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Relatório de Tabela de Preço', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Relatório de Tabela de Preço');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Relatorio Tabela de Preço', function () {
        relatorioPreco.rTP();
    });


});