var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var familiaProd = require('../../../../page-objects/Parametrizacao/Vendas/Produto/familiaProdutos.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Cadastro Familia de Produtos', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Família de Produtos');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Cadastro de Familia de Produtos', function () {
        familiaProd.adicionar();
    });

    it('Cadastro Automatico', function () {
        familiaProd.cadastroAutomatico();
    })

    it('Edição de Familia de Produtos', function () {
        familiaProd.editar();
    });

    it('Excluir Familia de Produtos', function () {
        expect(familiaProd.excluir()).toContain('Deletado com sucesso.');
    });
});