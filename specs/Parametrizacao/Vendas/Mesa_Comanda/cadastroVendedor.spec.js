var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var vendedor = require('../../../../page-objects/Parametrizacao/Vendas/Mesa_Comanda/cadastroVendedor.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Vendedor', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Vendedor (Garçom)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Cadastro de Vendedor', function () {
        vendedor.cadVend();
        vendedor.endereços();
        vendedor.telefones();
        vendedor.taxa();
        vendedor.entregador();

    });

    it('Edição do Cadastro de Vendedor', function () {
        vendedor.editarCadVend();
    });

    it('Exclusão do Cadastro de Vendedor', function () {
        expect(vendedor.excluirCadVend()).toContain('Excluído com sucesso!');
    });
});