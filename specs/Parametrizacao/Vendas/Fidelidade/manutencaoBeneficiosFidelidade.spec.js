var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var manutencao = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/manutencaoBeneficiosFidelidade.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Manutenção de Benefícios Fidelidade', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Manutenção de Benefícios Fidelidade');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Manutenção de Benefícios Fidelidade', function () {
        manutencao.manutencao();
        expect(z.widget.grid.getText('4162660492882674643628', 0, 1)).toContain(j.getValor('nomeConsumidor'));
    });

//future corrections, please change the expect validation if its possible
});