var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/fecharDia(forSale).po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Fechar Dia (For Sale)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Fechar o Dia - ForSale');
    });

    afterEach(function () {
        h.sairDoSistema();

    });

    fit('Fechamento de Dia (For Sale)', function () {
        expect(fechamento.fechaDia()).toContain('O fechamento do dia foi realizado com sucesso.');
    });

    it('Tentar realizar o Fechamento do dia sem a unidade', function () {
        expect(fechamento.tentaFecharDiaSemUnidade()).toContain('Campo obrigatório');
    });
});