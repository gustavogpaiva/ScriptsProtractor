var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var tipoConsCli = require('../../../../page-objects/Parametrizacao/Vendas/Consumidor/tipoConsumidorCliente.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Tipo de Consumidor por Cliente', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Tipo de Consumidor por Cliente');
    });

    afterEach(function () {
        h.sairDoSistema();

    });

    it('Cadastro de Tipo de Consumidor por Cliente', function () {
        tipoConsCli.tConsCli();
        expect(z.widget.grid.getText('699911802064703292673', 0, 1)).toContain('abc');
    });

    it('Edição de Tipo de Consumidor por Cliente', function () {
        tipoConsCli.editar();
        expect(z.widget.grid.getText('699911802064703292673', 0, 1)).toContain('abcd');
    });

    it('Tipo de Consumidor por Cliente', function () {
        expect(tipoConsCli.excluir()).toContain('Deletado com sucesso.');
    });
});