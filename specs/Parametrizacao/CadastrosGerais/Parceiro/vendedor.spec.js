var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var vendedor = require('../../../../page-objects/Parametrizacao/CadastrosGerais/Parceiro/vendedor.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Vendedor', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
    });


    afterAll(function () {
        h.sairDoSistema();
    });

    it('Vendedor', function () {
        vendedor.tela('Vendedor');
        vendedor.cadastro();
        /*vendedor.continuaCadastro();
        vendedor.continuaCadastro2();*/
    });

    xit('Editar', function () {
         vendedor.editar();
    });

    it('Excluir', function () {
        vendedor.excluir();
    });


});
