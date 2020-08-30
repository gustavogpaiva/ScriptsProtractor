var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var mesa = require('../../../../page-objects/Parametrizacao/Vendas/Mesa_Comanda/ambienteMesa.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Ambiente/Mesa', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Ambiente/Mesa');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Ambiente/Mesa', function () {
        mesa.ambiente();
        expect(z.widget.grid.getText('18979943125559279821449', 1, 2)).toContain('Teste');
    });

    it('Editar Ambiente/Mesa', function () {
        mesa.editar();
        expect(z.widget.grid.getText('18979943125559279821449', 1, 2)).toContain('Testes');
    });

    it('Excluir Ambiente/Mesa', function () {
        expect(mesa.excluir()).toContain('Deletado com sucesso.');
    });

    // fazer it para tentar excluir uma mesa que possui vendas, ainda não existe essa validação no sistema
    

});