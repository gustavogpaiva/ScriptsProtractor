var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var tabelaPreco = require('../../../../page-objects/Parametrizacao/Vendas/Produto/tabelaDePreco.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Tabela de Preço', function() {
    beforeEach(function() {
        loginPage.login();
        h.tela('Tabela de Preço');
    });

    afterEach(function() {
        h.sairDoSistema();
    });
    //cadastra uma nova loja para unidade
    it('Cadastrar Tabela de Preço', function() {
        tabelaPreco.tabelaDePreco();
        expect(tabelaPreco.adicionaProdutos()).toContain('1 Produto(s) inseridos com sucesso!');
    });
});