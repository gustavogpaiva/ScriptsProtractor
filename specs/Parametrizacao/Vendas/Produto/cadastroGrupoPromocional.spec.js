var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var promocional = require('../../../../page-objects/Parametrizacao/Vendas/Produto/cadastroGrupoPromocional.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Grupo Promocional', function () {

    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Grupo Promocional');
    });
 
    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Cadastro de Cadastro de Observação', function () {
        promocional.cadGrupo(); //não tem validação de cadastro
    });

    it('Edição de Grupo Promocional', function () {
        promocional.editar();// não tem validação de edição
    });

    it('Excluir Grupo Promocional', function () {
       expect(promocional.excluir()).toContain('Deletado com sucesso.');
    });
});