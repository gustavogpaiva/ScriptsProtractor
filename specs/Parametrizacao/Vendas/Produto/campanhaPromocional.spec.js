var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var campanha = require('../../../../page-objects/Parametrizacao/Vendas/Produto/campanhaPromocional.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela de Campanha Promocional', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Campanha Promocional');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    fit('Cadastro Campanha Promocional', function () {
        campanha.adicionar();
        expect(z.widget.grid.getText('64912031137750467508', 0, 1)).toContain('Campanha de teste odhen');
    });

    it('Tentar inserir código já existente', function () {
        expect(campanha.codigoIgual()).toContain('Atenção! Codigo Já utilizado.');
    });

    it('Editar Campanha Promocional', function () {
        campanha.editar();
        expect(z.widget.grid.getText('64912031137750467508', 0, 1)).toContain('Campanha de teste');
    });

    it('Excluir Campanha Promocional', function () {
        expect(campanha.excluir()).toContain('Excluído com sucesso!');
    });
    
});