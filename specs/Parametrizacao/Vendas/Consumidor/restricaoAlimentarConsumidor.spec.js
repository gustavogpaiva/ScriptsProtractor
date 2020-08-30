var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var resAlimCons = require('../../../../page-objects/Parametrizacao/Vendas/Consumidor/restricaoAlimentarConsumidor.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Restrição Alimentar de Consumidor', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Restrição Alimentar de Consumidor');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Restrição Alimentar de Consumidor', function () {
        resAlimCons.consumidor();
        resAlimCons.produto();
        expect(z.widget.grid.getText('115649133615094561671140', 0, 1)).toContain('Tek');
    });

    it('Editar Restrição Alimentarm de Consumidor', function () {
        resAlimCons.editar();
        expect(z.widget.grid.getText('115649133615094561671140', 0, 3)).toContain('400,00');
    });

    it('Excluir Restrição Alimentar de Consumidor', function () {
        expect(resAlimCons.excluir()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastro automático de consumidor', function () {
        expect(resAlimCons.cadastroAutomatico()).toContain('Cadastro Realizado com sucesso');
    });

    it('Exclusão de Cadastro Automático', function () {
        expect(resAlimCons.excluirAutomatico()).toContain('Operação realizada com sucesso.');
    });

});