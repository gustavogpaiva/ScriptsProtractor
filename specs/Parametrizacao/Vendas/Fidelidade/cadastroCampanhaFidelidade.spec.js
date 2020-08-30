var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fidelidade = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/cadastroCampanhaFidelidade.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Campanha de Fidelidade ', function () {

    
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Campanhas Fidelidade');
    });
 
    afterAll(function () {
        h.sairDoSistema();
    });
    afterAll(function () {
        h.fechaTela();
    });

    it('Cadastro Campanha de Fidelidade', function () {
        fidelidade.aplicaFilto('');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        fidelidade.cadastroCampanha();
        fidelidade.completaCadastro();
    });

    it('Edição de Campanha de Fidelidade', function () {
        fidelidade.editar();

    });

    it('Exclusão de Campanha de Fidelidade', function () {
        fidelidade.excluir();

    });
    // tela está com erro em campo obrigatório
});