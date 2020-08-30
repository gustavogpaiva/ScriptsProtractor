var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var confMenuProdComb = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/configuracaoMenuProdutosCombinados.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Configuração Menu de Produtos Combinados', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Configuração Menu de Produtos Combinados');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Adicionar Configuração Menu de Produtos Combinados', function () {
        expect(confMenuProdComb.adicionar()).toBe(true);
    });

    it('Editar Configuração Menu de Produtos Combinados', function () {
        expect(confMenuProdComb.editar()).toContain(j.getValor('nomeAlteracaoCadLoja'));
    });

    it('Excluir Configuração Menu de Produtos Combinados', function () {
        confMenuProdComb.excluir();
       //sem expect pq falta interação de excluido com sucesso.
    });
});