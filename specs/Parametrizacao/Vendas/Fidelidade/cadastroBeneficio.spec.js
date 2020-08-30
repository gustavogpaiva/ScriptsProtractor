var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var beneficio = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/cadastroBeneficio.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Beneficio', function () {
// issue para correção da tela 155414 (19/09/2018 ultima vez que foi realizado alterações na tela)
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Benefícios Fidelidade');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Beneficio', function () {
        beneficio.cadBeneficio();
        expect(z.widget.grid.getText('11911190533080875283384', 1, 1)).toContain('Nome Teste');

    });

    it('Editar Cadastro de Beneficio', function () {
        beneficio.editar();
        expect(z.widget.grid.getText('11911190533080875283384', 1, 1)).toContain('Apresentação Odhen');
    });

    it('Exclusão de Beneficio', function () {
        expect(beneficio.excluir()).toContain('Deletado com sucesso.');
    });
});