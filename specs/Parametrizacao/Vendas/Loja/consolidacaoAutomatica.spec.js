var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var consolidacao = require('../../../../page-objects/Parametrizacao/Vendas/Loja/consolidacaoAutomatica.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela de Consolidação Automática', function () {

    beforeEach(function () {
        loginPage.login();
        h.tela('Consolidação Automática');
    });

    afterEach(function () {
        h.sairDoSistema();
    })

    it('Consolidação Automática', function () {
        expect(consolidacao.consolidacao()).toContain('Alterado com sucesso.');
    });
});