var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var obs = require('../../../../page-objects/Parametrizacao/Vendas/Produto/cadastroObservacao.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Observação', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Observação');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Cadastro de Cadastro de Observação', function () {
        obs.cadObs();
        obs.observacao();
        obs.cadProdutos();
        expect(obs.obsObrigatoria()).toContain('Registros salvos com sucesso!');
    });

    it('Edição de Cadastro de Observação', function () {
        obs.editar();
    });

    it('Exclusão de Cadastro de Observação', function () {
        expect(obs.excluir()).toContain('Deletado com sucesso.');
    });
//esperar correção, tela está zoada na edição
});