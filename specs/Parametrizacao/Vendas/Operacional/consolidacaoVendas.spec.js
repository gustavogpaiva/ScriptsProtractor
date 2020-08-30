var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var consolidar = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/consolidacaoVendas.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Consolidação de Vendas', function () {
//tem erro na base do saas, não está retornando as vendas
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
    });

    afterEach(function () {
      h.sairDoSistema();
    });

    it('Parametrização da Unidade 1', function () {
        h.tela('Parâmetros da Unidade');
        consolidar.parametrosUnidadeConsolidacao();
    });

    fit('Consolidação de Vendas', function () {
        h.tela('Consolidação de Vendas');
        consolidar.vendas();
    });

    it('Cancelamento Consolidação de Vendas', function () {
        h.tela('Cancelamento da Consolidação de Vendas');
        consolidar.cancelamento();
    });

    it('Parametrização da Unidade', function () {
        h.tela('Parâmetros da Unidade');
        consolidar.editarParametrosConsolidacaoVendas();
    });

    it('Consolidação de Vendas parte 2', function () {
        browser.get('https://manage.teknisa.com/man/#/man#operation%2Fvnd05400_consolidacaodevendas');
        consolidar.segundaConsolidacaoVendas();
    });
});