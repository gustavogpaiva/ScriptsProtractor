var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var controle = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/controleAcessoCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Controle de Acesso do Caixa', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Controle de Acesso do Caixa');
        h.filtroGrupoOperador();
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Controle de Acesso do Caixa', function () {
        controle.acessoCaixa();
    });

    it('Editar', function () {
        controle.editar();
    });

    it('Excluir', function () {
        controle.excluir();
    });
    // tela não existe validaçao ainda
});